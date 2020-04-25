import React, {useEffect, useRef} from "react";
import active_like from "../../../assets/img/active_like.png"
import active_comment from "../../../assets/img/active_comment.png"
import active_repost from "../../../assets/img/active_repost.png"
import like from "../../../assets/img/like.png"
import comment from "../../../assets/img/coment.png"
import repost from "../../../assets/img/repost.png"
import "./postLenta.css";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import avatar from "../../../assets/img/avatar.jpg";
import {getPosts, updatePost, deletePost as deletePostAction} from "../../../actions/post";
import {NavLink} from "react-router-dom";
import CommentsLenta from "./commentsLenta/CommentsLenta";

export default function PostLenta(props) {

    const posts = useSelector(state => state.post.posts)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const likesRef = useRef()
    const commentsRef = useRef()
    const repostsRef = useRef()
    const settingsRef = useRef()

    useEffect(()=>{
        axios.get(`http://localhost:8080/post?user_id=${props.id}&my_id=${currentUser.id}`)
            .then(response=> {
                dispatch(getPosts(response.data))
            })
    }, [])

    function commentClick(post){
        if( document.getElementById("comment-editor-" + post.id).style.display == "flex"){
            document.getElementById("comment-editor-" + post.id).style.display = "none"
        } else {
            document.getElementById("comment-editor-" + post.id).style.display = "flex"
        }
    }
    function likeClick(post){
        axios.put("http://localhost:8080/post", {
            id: post.id,
            likes: 1,
            likerId: currentUser.id
        }).then(response => {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id == post.id) {
                    posts[i].likes = response.data.likes;
                    posts[i].liked = response.data.liked
                    if (posts[i].liked == true) {
                        document.getElementById("post-likes-btn-" + post.id).style.backgroundImage = `url(${active_like})`
                    } else {
                        document.getElementById("post-likes-btn-" + post.id).style.backgroundImage = `url(${like})`
                    }
                }
            }
            const newPosts = [...posts]
            dispatch(updatePost(newPosts))
        })
    }

    function repostClick(post){
        axios.put("http://localhost:8080/post", {
            id: post.id,
            reposts: 1
        }).then(response => {
            for (let i = 0; i < posts.length ; i++) {
                if(posts[i].id == post.id){
                    posts[i].reposts = response.data.reposts;
                }
            }
            const newPosts = [...posts]
            dispatch(updatePost(newPosts))
        })
    }

    function settingsClick(post) {
        console.log(post.settings)
        if(post.settings == false){
            document.getElementById("post-settings-menu-" + `${post.id}`).style.display = "flex"
            post.settings = true
        } else {
            document.getElementById("post-settings-menu-" + `${post.id}`).style.display = "none"
            post.settings = false
        }
    }
    function deletePost(post) {
        axios.delete(`http://localhost:8080/post?post_id=${post.id}`)
            .then(()=> {
                dispatch( deletePostAction(posts.filter(p => p.id !== post.id)))
            })
    }

    return (
        <div className={"lenta-flex"}>
            {posts.map((post) =><div className="post" key={post.id}>
                {post.settings = false}
                <div className="post-top-panel">
                    <NavLink to={`/profile/${post.creatorId}`}>
                        <div className="post-avatar" style={ post.avatar != null ? {
                            backgroundImage: `url('data:image/jpeg;base64,${post.avatar}`,
                        } : {backgroundImage:`url(${avatar})`}}
                        />
                    </NavLink>
                    <div className="post-username"><NavLink to={`/profile/${post.creatorId}`}>{post.surname + " " + post.name}</NavLink></div>
                    <div>
                        <button className="post-settings" onClick={()=>settingsClick(post)}/>
                        <div id={"post-settings-menu-"+post.id} className="post-settings-menu">
                            {currentUser.id == post.creatorId &&
                            <div className="post-setting-my">
                                <button className="post-settings-menu-item" onClick={()=>deletePost(post)}>Delete</button>
                                <button className="post-settings-menu-item">Edit</button>
                            </div>
                            }
                            <button className="post-settings-menu-item">Copy URL</button>
                        </div>

                    </div>
                </div>
                <div className="post-content">
                    <div className="post-content-text">
                        {post.text}
                    </div>
                    <div className="post-content-img" style={post.postImg != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${post.postImg}`,
                    } : {width:"0", height:"0"}}/>
                </div>
                <div className="post-bottom-panel">
                    <div className="post-date">{post.creation}</div>
                    <div className="post-comments">
                        <div className="post-comments-count">{post.comments}</div>
                        <button className="post-comments-btn" style={post.comments > 0 ? {
                            backgroundImage: `url(${active_comment})`,
                        } : {}} onClick={()=>commentClick(post)}/>
                    </div>
                    <div className="post-likes">
                        <div className="post-likes-count">{post.likes}</div>
                        <button className="post-likes-btn" id={"post-likes-btn-"+post.id} style={post.liked == true ? {
                            backgroundImage: `url(${active_like})`,
                        } : {}} onClick={()=>likeClick(post)}/>
                    </div>
                    <div className="post-reposts">
                        <div className="post-reposts-count">{post.reposts}</div>
                        <button className="post-reposts-btn" onClick={()=>repostClick(post)}/>
                    </div>
                </div>
                <CommentsLenta display="none" postId={post.id} userId={currentUser.id}/>
            </div> )}
        </div>
    );
}
import React, {useEffect, useRef} from "react";
import Logo from "../../../assets/img/instagram.png";
import "./postLenta.css";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import {getPosts, updatePost, deletePost as deletePostAction} from "../../../actions/post";

export default function PostLenta(props) {

    const posts = useSelector(state => state.post.posts)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const likesRef = useRef()
    const commentsRef = useRef()
    const repostsRef = useRef()
    const settingsRef = useRef()

    useEffect(()=>{
        axios.get(`http://localhost:8080/post?user_id=${props.id}`)
            .then(response=> {
                dispatch(getPosts(response.data))

            })
    }, [])

    function commentClick(post){
        post.comments++
        axios.put("http://localhost:8080/post", {
            id: post.id,
            comments: post.comments
        }).then(response => {
            dispatch(getPosts(posts))
        })
    }
    function likeClick(post){
        post.likes++
        axios.put("http://localhost:8080/post", {
            id: post.id,
            likes: post.likes
        }).then(response => {
            dispatch(getPosts(posts))
        })
    }
    function repostClick(post){
        post.reposts++
        axios.put("http://localhost:8080/post", {
            id: post.id,
            reposts: post.reposts
        }).then(response => {
            dispatch(getPosts(posts))
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
                posts.splice(posts.indexOf(post),1)
                dispatch( deletePostAction(posts))
            })
    }
    return (
        <div className={"lenta-flex"}>
            {posts.map((post) =><div className="post" key={post.id}>
                {post.settings = false}
                <div className="post-top-panel">
                    <div className="post-avatar" style={{
                        backgroundImage: `url('data:image/jpeg;base64,${post.avatar}`,
                    }}
                    />
                    <div className="post-username">{post.surname + " " + post.name}</div>
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
                    <div className="post-content-img" style={{
                        backgroundImage: `url('data:image/jpeg;base64,${post.postImg}`,
                    }}/>
                </div>
                <div className="post-bottom-panel">
                    <div className="post-date">{post.creation}</div>
                    <div className="post-comments">
                        <div className="post-comments-count">{post.comments}</div>
                        <button className="post-comments-btn" onClick={()=>commentClick(post)}/>
                    </div>
                    <div className="post-likes">
                        <div className="post-likes-count">{post.likes}</div>
                        <button className="post-likes-btn" onClick={()=>likeClick(post)}/>
                    </div>
                    <div className="post-reposts">
                        <div className="post-reposts-count">{post.reposts}</div>
                        <button className="post-reposts-btn" onClick={()=>repostClick(post)}/>
                    </div>
                </div>
            </div> )}
        </div>
    );
}
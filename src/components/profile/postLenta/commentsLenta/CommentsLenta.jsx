import React, {useEffect, useRef, useState} from "react";
import './commentsLenta.css';
import Comment from "./comment/Comment";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../../../../actions/post";
import active_like from "../../../../assets/img/active_like.png";
import like from "../../../../assets/img/like.png";

export default function CommentsLenta(props) {

    const [comments, setComments] = useState([])
    const textRef = useRef()
    const posts = useSelector(state=> state.post.posts)
    const dispatch = useDispatch()

    useEffect(()=> {
        axios.get(`http://localhost:8080/post/comments?post_id=${props.postId}`)
            .then(response => setComments(response.data))
    }, [])

    function commentClick() {
        const date = new Date()
        let year = date.getFullYear()
        let day = date.getDate()
        if(day < 10) day = "0"+day
        let month = date.getMonth()+1
        if(month < 10) month = "0"+month
        let hours = date.getHours()
        if(hours < 10) hours = "0"+hours
        let mins = date.getMinutes()
        if(mins < 10) mins = "0"+mins
        const fullDate = hours+":"+mins+"  " + day +"."+month+"."+year

        axios.post("http://localhost:8080/post/comments",{
            postId: props.postId,
            userId: props.userId,
            text: textRef.current.value,
            creation:fullDate
        }).then(response=> {
            setComments([response.data,...comments])
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id == props.postId) {
                    posts[i].comments = response.data.commentsCount;
                }
            }
            const newPosts = [...posts]
            dispatch(updatePost(newPosts))
        })
    }

    return (
        <div className="comments"  >
            <div className="comments-header">Comments</div>
            <div className="comments-editor" id={"comment-editor-" + props.postId} style={
                {display: props.display}
            }>
                <textarea placeholder="Write your comment..." ref={textRef}></textarea>
                <button className="comments-editor-btn" onClick={()=>commentClick()}>Comment</button>
            </div>
            {comments.map(com =>
                <Comment comment={com}/>
            )}
        </div>
    );
}
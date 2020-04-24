import React, {useRef} from 'react'
import "./createPost.css"
import axios from 'axios'
import {useSelector, useDispatch,} from "react-redux";
import {addPost} from "../../../../actions/post";

export default function CreatePost(props) {

    const textRef = useRef()
    const dispatch = useDispatch()
    const fileInputRef = useRef()
    const currentUser = useSelector(state => state.user.currentUser)

    function createPost() {
        const formData = new FormData()
        formData.append("creator_id", currentUser.id)
        formData.append("user_id", props.id)
        formData.append("img", fileInputRef.current.files[0])
        formData.append("text",  textRef.current.value)
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
        formData.append("creation", fullDate)
        axios.post("http://localhost:8080/post",formData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }}).then(response => dispatch(addPost(response.data)))
    }

    return (
        <div className="post-creator">
            <textarea className="create-area" placeholder="Share your news..." ref={textRef}></textarea>
            <div className="post-btns">
                <label for="post-file" className="file-label"></label>
                <input type="file" id="post-file" ref={fileInputRef} className="skrepka-btn"></input>
                <button className="post-btn" onClick={()=>createPost()}>Add post</button>
            </div>
        </div>
    )


};
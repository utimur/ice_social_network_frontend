import React, {useRef} from 'react'
import "./createPost.css"
import axios from 'axios'
import {useSelector, useDispatch,} from "react-redux";
import {addPost} from "../../../../actions/post";

export default function CreatePost(props) {

    const textRef = useRef()
    const dispatch = useDispatch()
    const fileInputRef = useRef()
    const loadedRef = useRef()
    const loadedImgRef = useRef()
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
            }}).then(response => {
            dispatch(addPost(response.data))
            loadedRef.current.style.display = "none"
        })
    }

    function screpkaClick() {
        loadedRef.current.style.display = "block"
        var fr = new FileReader();
        fr.onload = function () {
            loadedImgRef.current.style.backgroundImage = `url(${fr.result})`
        }
        fr.readAsDataURL(fileInputRef.current.files[0]);
    }

    return (
        <div className="post-creator">
            <div className="post-creator-flex">
                <textarea className="create-area" placeholder="Share your news..." ref={textRef}/>
                <div className="post-btns">
                    <label htmlFor="post-file" className="file-label"/>
                    <input type="file" id="post-file" onChange={() => screpkaClick()} ref={fileInputRef}
                           className="skrepka-btn"/>
                    <button className="post-btn" onClick={() => createPost()}>Add post</button>
                </div>
                <div className="loaded" ref={loadedRef}>
                    <div className="loaded-img" ref={loadedImgRef}></div>
                </div>
            </div>
        </div>
    )


};
import React, {useRef} from "react";
import './inputArea.css';
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {addMessage, setMessage} from "../../../../actions/message";

export default function InputArea(props) {

    const inputRef = useRef()
    const currentUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()
    const messages = props.messages
    const setMessages = props.setMessages
    const myDialog = props.myDialog
    const friendDialog = props.friendDialog
    const setMyDialog = props.setMyDialog
    const setFriendDialog = props.setFriendDialog

    const loadedRef = useRef()
    const loadedImgRef = useRef()
    const fileInputRef = useRef()

    console.log(messages.length)
    function sendMessageClick() {
        if (messages.length == 0) {
            axios.post("http://localhost:8080/dialog", {
                user: {
                    id: currentUser.id
                },
                friend: {
                    id: props.friendId
                }
            }).then(response => {
                setMyDialog(response.data[0]);
                setFriendDialog(response.data[1])
                sendMessage(response.data[0], response.data[1])
            });
        } else {
            sendMessage(myDialog,friendDialog)
        }
    }

    function sendMessage(myDialog, friendDialog) {
        const formData = new FormData()
        formData.append("dialog_id", myDialog.id)
        formData.append("user_id" , currentUser.id)
        formData.append("text" , inputRef.current.value)
        formData.append("img" , fileInputRef.current.files[0])
        axios.post("http://localhost:8080/message", formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            setMessages([...messages,response.data]);
        })
        const formDataFriend = new FormData()
        formDataFriend.append("dialog_id", friendDialog.id)
        formDataFriend.append("user_id" , currentUser.id)
        formDataFriend.append("text" , inputRef.current.value)
        formDataFriend.append("img" , fileInputRef.current.files[0])
        axios.post("http://localhost:8080/message", formDataFriend,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data)
        })
        inputRef.current.value = ""
        loadedRef.current.style.display = "none"
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
        <div className="input-area">
            <div className="post-creator-flex">
                <textarea className="create-area" ref={inputRef} placeholder="Enter your message..." />
                <div className="post-btns">
                    <button className="micro" ></button>
                    <label htmlFor="post-file" className="file-label" />
                    <input type="file" id="post-file" className="skrepka-btn" onChange={() => screpkaClick()} ref={fileInputRef}/>
                    <button className="post-btn" onClick={()=>sendMessageClick()} >Send</button>
                </div>
                <div className="loaded" ref={loadedRef}>
                    <div className="loaded-img" ref={loadedImgRef}></div>
                </div>
            </div>
        </div>
    )
}
import React, { useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import './chat.css'
import axios from 'axios'
import MessageList from "./messageList/MessageList";
import {addMessage} from "../../actions/message";
import {Redirect} from "react-router-dom";


export default function Chat(props) {
    const url = "http://localhost:8080/"
    const inputRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)

    function sendMessage(){
        axios.post(url + "message", {
            text: inputRef.current.value,
            authorId: user.id,
            friendId:props.friend.id,
        })
            .then(response => dispatch(addMessage(response.data)))
    }

    if (user.isLoggedIn == false) {
        return <Redirect to={"/login"}></Redirect>
    }
    return (
        <div className="chat-flex">
            <MessageList/>
            <textarea ref={inputRef} className="form-control"></textarea>
            <div className="btn-flex">
                <button className="btn" onClick={()=>sendMessage()}>Send</button>
            </div>
        </div>
    );
}
import React, { useRef} from "react"
import {useDispatch} from "react-redux";
import './chat.css'
import axios from 'axios'
import MessageList from "./messageList/MessageList";
import {addMessage} from "../../actions/message";


export default function Chat(props) {
    const url = "http://localhost:8080/"
    const inputRef = useRef()
    const despatch = useDispatch()

    function sendMessage(){
        axios.post(url + "message", {
            text: inputRef.current.value
        }).then(response => despatch(addMessage(response.data)))
    }


    return (
        <div>
            <MessageList/>
            <div className="row">
                <div className="col-8 offset-2">
                    <textarea ref={inputRef} className="form-control"></textarea>
                    <button className="btn btn-primary float-right" onClick={()=>sendMessage()}>Send</button>
                </div>
            </div>
        </div>
    )
}
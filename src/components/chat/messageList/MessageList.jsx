import React, {useEffect, useRef} from "react";
import axios from 'axios';
import './messageList.css'
import {useSelector, useDispatch} from "react-redux";
import {getMessages,addMessage} from "../../../actions/message";

export default function MessageList() {

    const messages = useSelector(state => state.message.messages)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const messRef = useRef()

    useEffect(()=> {
        axios.get("http://localhost:8080/message")
            .then(response => {
                response.data.forEach(item => {
                    dispatch(addMessage(JSON.parse(item)));
                })
            })
            .then(response => (messRef.current.scrollTop = messRef.current.scrollHeight))
    }, [])

    return (
        <div>
            <div className="messages" ref={messRef}>

                {messages.map((mes) =>
                    <div className={mes.user.id == currentUser.id ? "flex-my-message" : ("flex-friend-message")}>
                        <div  className={mes.user.id == currentUser.id ? "my-message" : ("friend-message")}>
                            <p className="username">
                                {mes.user.username + ": "}
                            </p>
                            <p className="text"
                               key={mes.message.id}> {mes.message.text}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

};
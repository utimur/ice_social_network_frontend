import React, {useEffect, useRef} from "react";
import axios from 'axios';
import './MessageList.css'
import {useSelector, useDispatch} from "react-redux";
import {getMessages} from "../../../actions/message";

export default function MessageList() {

    const messages = useSelector(state => state.message.messages)
    const dispatch = useDispatch()
    const messRef = useRef()

    useEffect(()=> {
        axios.get("http://localhost:8080/message")
            .then(response => dispatch(getMessages(response.data)))
            .then(response => console.log(messRef.current.scrollTop = messRef.current.scrollHeight))
    }, [])

    return (
        <div className="row">
            <div className="col-8 offset-2">
                <div className="messages" ref={messRef}>
                    {messages.map((mes) => <p key={mes.id}>{mes.text}</p>)}
                </div>
            </div>
        </div>
    )

};
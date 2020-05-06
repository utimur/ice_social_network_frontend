import React, {useEffect, useRef, useState} from "react";
import './chat.css';
import ChatInfo from "./chatInfo/ChatInfo";
import MessageBox from "./messageBox/MessageBox";
import InputArea from "./inputArea/InputArea";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from 'react-router-dom'
import {getMessages, setMessage} from "../../../actions/message";

export default function Chat(props) {

    const currentUser = useSelector(state => state.user.currentUser)
    const location = useLocation()
    const [myDialog, setMyDialog] = useState({friend:{}})
    const [friendDialog, setFriendDialog] = useState({})
    const dispatch = useDispatch()
    const messageBoxRef = useRef()
    const [messages, setMessages] = useState([])

    console.log(location)


    useEffect(( )=>{

        axios.get(`http://localhost:8080/dialog/one?user_id=${currentUser.id}&friend_id=${props.match.params.id}`)
            .then(response => {
                setMyDialog(response.data[0])
                setFriendDialog(response.data[1])
                axios.get(`http://localhost:8080/message?id=${response.data[0].id}`)
                        .then(response => {
                            setMessages(response.data)
                        })
            })
    },[props.match.params.id])



    return (
        <div className="chat">
            <ChatInfo myDialog={myDialog} loc={location}/>

            <MessageBox  messages={messages} userId={currentUser.id} friendId={props.match.params.id}
                         messageBoxRef={messageBoxRef}
                         setMyDialog={setMyDialog} myDialog={myDialog}
                         setFriendDialog={setFriendDialog} friendDialog={friendDialog} />

            <InputArea messageBoxRef={messageBoxRef} messages={messages} setMessages={setMessages}
                       friendId={props.match.params.id}
                       setMyDialog={setMyDialog} myDialog={myDialog}
                       setFriendDialog={setFriendDialog} friendDialog={friendDialog} />

        </div>
    )
}
import React, {useEffect} from "react";
import './messageBox.css';
import Message from "./message/Message";

export default function MessageBox(props) {

    const dialog = props.myDialog

    useEffect(()=>{
        props.messageBoxRef.current.scrollTop = props.messageBoxRef.current.scrollHeight
    },[props.messages])


    return (
        <div className="messages" ref={props.messageBoxRef}>
            {props.messages.map(mess =>
                <Message message={mess} type={ mess.user.id == props.userId ? "my" : "friend"}/>
            )}
        </div>
    )

};
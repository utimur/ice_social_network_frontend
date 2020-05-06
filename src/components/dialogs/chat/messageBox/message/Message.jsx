import React from "react";
import "./message.css";
import avatar from "../../../../../assets/img/avatar.jpg";

export default function Message(props) {


    return (
        <div className={`${props.type}-message`}>
            <div className={`${props.type}-message-username`}>{props.message.user.surname + " " + props.message.user.name}</div>
            <div className={`${props.type}-message-text`}>{props.message.text}</div>
            <div className={`${props.type}-message-img`} style={props.message.imgStr != null ? {
                backgroundImage: `url('data:image/jpeg;base64,${props.message.imgStr }`,
            } : {display: "none"}}></div>
            <div className={`${props.type}-message-date`}>{props.message.date}</div>
        </div>
    );

}
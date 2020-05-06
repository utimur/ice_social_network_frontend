import React, {useEffect, useState} from "react";
import './dialog.css';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import {useSelector} from "react-redux";
import avatar from "../../../assets/img/avatar.jpg";

export default function Dialog(props) {

    const currentUser = useSelector(state=>state.user.currentUser)
    const dialog = props.dialog


    return (
        <NavLink to={{
            pathname:`/chat/${props.friendId}`,
            state: {friend:dialog.friend}
        }}>
            <div className="dialog">
                <div className="dialog-img">
                    <div className="dialog-img-left" style={dialog.user.avatarStr != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${dialog.user.avatarStr}`,
                    } : {backgroundImage: `url(${avatar})`}}/>
                    <div className="dialog-img-delimeter"></div>
                    <div className="dialog-img-right" style={dialog.friend.avatarStr != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${dialog.friend.avatarStr}`,
                    } : {backgroundImage: `url(${avatar})`}} />
                </div>
                <div className="dialog-content">
                    <div className="dialog-content-username">{dialog.friend.surname + " " + dialog.friend.name }</div>
                    <div className="dialog-content-message">{dialog.lastMessage}</div>
                </div>
                <div className="dialog-date">{dialog.lastMessageDate}</div>
            </div>
        </NavLink>
    );
};
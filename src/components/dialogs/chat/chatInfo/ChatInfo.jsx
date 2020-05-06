import React, {useEffect} from "react";
import "./chatInfo.css";
import avatar from "../../../../assets/img/avatar.jpg";
import {NavLink} from "react-router-dom";

export default function ChatInfo(props) {

    const myDialog = props.myDialog



    return (
        <div className="chat-info">
            <NavLink to={`/profile/${props.loc.state.friend.id}`}>
                <div className="chat-info-img" style={props.loc.state.friend.avatarStr != null  ? {
                    backgroundImage: `url('data:image/jpeg;base64,${props.loc.state.friend.avatarStr}`,
                } : {backgroundImage: `url(${avatar})`}}/>
            </NavLink>
            <div className="chat-info-content">
                <NavLink to={`/profile/${props.loc.state.friend.id}`}>
                    <div className="chat-info-content-username">{props.loc.state.friend.surname + " " + props.loc.state.friend.name}</div>
                </NavLink>
                <div className="chat-info-content-online">{props.loc.state.friend.online}</div>
            </div>
            <button className="chat-info-settings"/>
        </div>
    );
    // return (
    //     <div className="chat-info">
    //         <NavLink to={`/profile/${myDialog.friend.id}`}>
    //             <div className="chat-info-img" style={myDialog.friend.avatarStr != null  ? {
    //                 backgroundImage: `url('data:image/jpeg;base64,${myDialog.friend.avatarStr}`,
    //             } : {backgroundImage: `url(${avatar})`}}/>
    //         </NavLink>
    //         <div className="chat-info-content">
    //             <NavLink to={`/profile/${myDialog.friend.id}`}>
    //                 <div className="chat-info-content-username">{myDialog.friend.surname + " " + myDialog.friend.name}</div>
    //             </NavLink>
    //             <div className="chat-info-content-online">{myDialog.friend.status}</div>
    //             <div className="chat-info-content-online">{myDialog.friend.online}</div>
    //         </div>
    //         <button className="chat-info-settings"/>
    //     </div>
    // );
}
import React from 'react';
import './userList.css';
import {NavLink} from "react-router-dom";
import avatar from "../../../assets/img/avatar.jpg";

export default function UserList(props) {

    const users = props.users
    const avatarSize = `${props.avatarSize}px`

    return (

        <div className="users">
            {users.map(user =>
                <div className="user">
                    <NavLink to={`/profile/${user.id}`}>
                        <div className="user-avatar" style={user.avatarStr != null ? {
                            backgroundImage: `url('data:image/jpeg;base64,${user.avatarStr}`,
                            width: avatarSize,
                            height: avatarSize
                        } : {
                            backgroundImage:`url(${avatar})`,
                            width: avatarSize,
                            height: avatarSize
                        }}/>
                    </NavLink>
                    <div className="user-info">
                        <div className="user-info-username"><NavLink to={`/profile/${user.id}`}>{user.surname + " " + user.name}</NavLink></div>
                        <div className="user-info-id">id: {user.id}</div>
                    </div>
                    <div className="user-online">{user.online}</div>
                </div>
            )}
        </div>

    )
}
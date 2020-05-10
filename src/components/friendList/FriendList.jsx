import React, {useEffect, useState} from "react";
import "./friendList.css";
import axios from 'axios'
import avatar from '../../assets/img/avatar.jpg'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import SearchInput from "../utils/searchInput/SearchInput";
import UserList from "../utils/userList/UserList";

export default function (props) {

    const [friends, setFriends] = useState([])
    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(()=>{
        axios.get(`http://localhost:8080/friends?id=${props.match.params.id}`)
            .then(responce => setFriends(responce.data))
    }, [props.match.params.id])

    return (
        <div className="friend-list">
            <SearchInput/>
            <UserList users={friends} avatarSize={50}/>
            {/*<div className="users">*/}
            {/*    {friends.map(friend =>*/}
            {/*        <div className="user">*/}
            {/*            <NavLink to={`/profile/${friend.id}`}>*/}
            {/*                <div className="user-avatar" style={friend.avatarStr != null ? {*/}
            {/*                    backgroundImage: `url('data:image/jpeg;base64,${friend.avatarStr}`,*/}
            {/*                } : {backgroundImage:`url(${avatar})`}}/>*/}
            {/*            </NavLink>*/}
            {/*            <div className="user-info">*/}
            {/*                <div className="user-info-username"><NavLink to={`/profile/${friend.id}`}>{friend.surname + " " + friend.name}</NavLink></div>*/}
            {/*                <div className="user-info-id">id: {friend.id}</div>*/}
            {/*            </div>*/}
            {/*            <div className="user-online">{friend.online}</div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );

};
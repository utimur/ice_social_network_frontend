import React, {useEffect, useState} from "react";
import './followersList.css';
import UserList from "../utils/userList/UserList";
import {getFollowersList} from "../../effect/user";

export default function FollowersList(props) {

    const [followers, setFollowers] = useState([])

    useEffect(()=>{
            getFollowersList(setFollowers, props.location.state.type, props.match.params.id )
    },[props.match.params.id])

    return (
            <UserList users={followers} avatarSize={50}/>
    )
}
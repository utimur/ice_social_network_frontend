import React, {useEffect, useRef, useState} from "react";
import "./friends.css";
import Followers from "./followers/Followers";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import {updateUser} from "../../../../actions/user";
import avatar from "../../../../assets/img/avatar.jpg";
import {NavLink} from "react-router-dom";


export default function Friends(props) {

    const currentUser = useSelector(state => state.user.currentUser)



    return (
        <div className="friends">


            <div className="left-block">
                <Followers  count={props.followersCount} name="followers" id={props.id}/>
                <Followers count={props.followingCount} name="following" id={props.id}/>
                <Followers  count={0} name="My groups"/>
            </div>


            <div className="right-block">
                <div className="friends-header"><NavLink to={`/friends/${props.id}`}>Friends: {props.friendsCount}</NavLink></div>
                {props.friends.map(friend=>
                    <div className="friend-flex">
                        <div className="friend-flex-avatar" style={ friend.avatarStr != null ? {
                            backgroundImage: `url('data:image/jpeg;base64,${friend.avatarStr}`
                        } : {backgroundImage:`url(${avatar}`}}/>
                        <div className="friend-flex-name"><NavLink to={`/profile/${friend.id}`}>{friend.surname + " " + friend.name}</NavLink></div>
                    </div>
                )}
                {props.friends.length == 0 &&
                        <div className="no-friends">
                            Have no friends
                        </div>
                }
            </div>
        </div>
    );

};
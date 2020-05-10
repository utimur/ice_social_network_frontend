import React, {useEffect, useState, useRef} from "react";
import avatar from "../../../assets/img/avatar.jpg";
import axios from 'axios'
import "./profileInfo.css"
import {useSelector, useDispatch} from "react-redux";
import { updateUser} from '../../../actions/user'

import CreatePost from "./createPost/CreatePost";
import Friends from "./friends/Friends";
import {NavLink} from "react-router-dom";
import {
    deleteAvatar, follow,
    // getAvatar,
    getFollowers,
    getFollowing,
    getFriends,
    getIsFriend,
    getProfile,
    sendFile, unfollow, updateStatus
} from "../../../effect/user";

export default function ProfileInfo(props) {

    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const inputRef = useRef();
    const statusRef = useRef();
    const avatarRef = useRef();
    const dialogRef = useRef();
    const avatarLabelRef = useRef();
    const avatarDeleteRef = useRef();
    const updateStatusRef = useRef();
    const user_id = useSelector(state => state.user.currentUser.id)
    const currentUser = useSelector(state => state.user.currentUser)
    const [isFriend, setIsFriend] = useState(false);
    const [friends, setFriends] = useState([])
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [avatarChange, setAvatarChange] = useState(0)

    useEffect(() => {
        getFriends(props,setFriends)
        getFollowing(props, setFollowing)
        getFollowers(props, setFollowers)
        getIsFriend(currentUser, props,setIsFriend)
        getProfile(props, setUser)
    }, [props.id, isFriend, avatarChange]);

    function statusChange(event) {
        updateStatusRef.current.style.display = "block"
    }
    function avatarMouse() {
        avatarDeleteRef.current.style.display = "block"
        avatarLabelRef.current.style.visibility = "visible"
        avatarLabelRef.current.style.display = "block"
    }
    function avatarMouseOut() {
        avatarLabelRef.current.style.visibility = "hidden"
        avatarLabelRef.current.style.display = "none"
        avatarDeleteRef.current.style.display = "none"
    }
    function messageClick() {
        props.history.push(`/chat/${props.id}`)
    }

    return (
        <div className={"profile-info"}>
            <div className="dialog-window"  ref={dialogRef}>
                <div className="dialog-text"> Do you really want to delete your avatar?</div>
                <div className="dialog-btns">
                    <button onClick={()=>deleteAvatar(avatarRef, user_id, dialogRef,setAvatarChange, avatarChange)}>Delete</button>
                    <button onClick={()=> dialogRef.current.style.display = "none"}>Cancel</button>
                </div>
            </div>
            <div className="profile-info-flex">
                <div className={"user-info"}>
                    <div className={"user-info-data"}>
                        <div className="online">{user.online}</div>
                        <div className={"name"}>{user.name} {user.surname}</div>
                    </div>
                    <div className={"id"}>id:{user.id}</div>
                    <div className="status-flex">
                        <div onInput={(event) => statusChange(event)}
                             contentEditable={user_id == user.id ? "true" : "false"} ref={statusRef}
                             className="status-area">
                            {(user.status == null && user_id == user.id) ? "Enter your status" : user.status}
                        </div>
                        <button onClick={()=>updateStatus(statusRef, updateStatusRef,currentUser, dispatch)} className="status-btn" ref={updateStatusRef}
                                contentEditable="false">Update</button>
                    </div>
                    {props.id != currentUser.id &&
                    <div className="profile-btns">
                        <NavLink to={{
                            pathname:`/chat/${props.id}`,
                            state: {friend:user}
                        }}>
                            <button className="profile-btn" onClick={()=>messageClick()}>Message</button>
                        </NavLink>
                        <button className="profile-btn"
                                onClick={isFriend ?  ()=>unfollow(currentUser, props,setIsFriend)
                                    : ()=>follow(currentUser, props, setIsFriend) }>{
                            isFriend ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                    }
                </div>
                <div className="avatar-flex" onMouseOver={user_id==user.id ? ()=>avatarMouse() : ""} onMouseOut={user_id==user.id ? ()=>avatarMouseOut() : ""}>
                    <div ref={avatarRef} className="avatar" style={ user.avatarStr != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${user.avatarStr}`,
                    } : {backgroundImage:`url(${avatar})`}}>
                    </div>
                    {user_id == user.id &&
                    <form name="uploader" method="POST">
                        <label htmlFor="avatar-input" ref={avatarLabelRef} className="avatar-label">Change</label>
                        <input id="avatar-input" className="avatar-input" name="file" type="file"
                               ref={inputRef} onChange={() => sendFile(inputRef, user_id, dispatch, setAvatarChange, avatarChange)}/>
                    </form>
                    }
                    {user_id == user.id &&
                    <button className="avatar-delete-btn" ref={avatarDeleteRef} onClick={()=> dialogRef.current.style.display = "block"}/>
                    }
                </div>
            </div>
            <Friends friends={friends} friendsCount={user.friendsCount} followersCount={user.followersCount} followingCount={user.followingCount} groupCount={0} id={props.id}/>
            <CreatePost id={props.id}/>
        </div>
    );
};
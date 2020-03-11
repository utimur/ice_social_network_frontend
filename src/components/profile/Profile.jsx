import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import "./profile.css"
import avatar from '../../assets/img/bboy_avatar.png'
export default function Profile(props) {

    const user = useSelector(state => state.user.currentUser)
    if (user.isLoggedIn == false) {
        return <Redirect to={"/login"}></Redirect>
    }

    return (
        <div className={"profile-flex"}>
            <img src={avatar} className="avatar" />
            <div className={"user-info"}>
                <div className={"user-info-reg"}>
                    <div className={"username"}>{user.username}</div>
                    <div className={"id"}>id: {user.id}</div>
                </div>
                <div className={"user-info-data"}>
                    <div className={"name"}>Тимур</div>
                    <div className={"surname"}>Ульби</div>
                </div>
            </div>
        </div>
    )
}
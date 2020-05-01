import React from "react";
import './leftBar.css';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export default function LeftBar() {

    const user = useSelector(state => state.user.currentUser)

    return (

        <div className="leftbar">
            <ul>
                <li><NavLink to={`/profile/${user.id}`}>My profile</NavLink></li>
                <li><NavLink to="/dialogs">Dialogs</NavLink> </li>
                <li><NavLink to={`/friends/${user.id}`}>Friends</NavLink></li>
                <li><NavLink to={`/friends/0`}>All users</NavLink></li>
            </ul>
        </div>
    )
}
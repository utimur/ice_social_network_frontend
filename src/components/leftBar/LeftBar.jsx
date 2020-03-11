import React from "react";
import './leftBar.css';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export default function LeftBar() {

    return (

        <div className="leftbar">
            <ul>
                <li><NavLink to="/profile">My profile</NavLink></li>
                <li><NavLink to="/chat">Dialogs</NavLink> </li>
                <li><NavLink to="3">Friends</NavLink></li>
            </ul>
        </div>
    )
}
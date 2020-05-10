import React from 'react';
import "./followers.css";
import {NavLink} from "react-router-dom";
import avatar from "../../../../../assets/img/avatar.jpg";

export default function Followers(props) {


    return(
        <div className="followers">
                <NavLink to={{
                    pathname:`/followers/${props.id}`,
                    state: {type:props.name}
                }}>
                <div className="followers-header">{props.name}</div>
                <div className="followers-count">{props.count}</div>
            </NavLink>
        </div>
    )

}
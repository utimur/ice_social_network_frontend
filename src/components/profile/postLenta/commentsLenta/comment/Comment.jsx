import React from "react";
import "./comment.css";
import avatar from "../../../../../assets/img/avatar.jpg";
import {NavLink} from "react-router-dom";

export default function Comment(props) {
    return (
        <div className="comment">
            <div className="comment-top">
                <NavLink to={`/profile/${props.comment.userId}`}>
                    <div className="comment-top-img" style={props.comment.avatar != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${props.comment.avatar}`,
                    } : {backgroundImage:`url(${avatar})`}}/>
                </NavLink>
                <div className="comment-top-username"><NavLink to={`/profile/${props.comment.userId}`}>{props.comment.username}</NavLink></div>
                <button className="comment-top-settings"/>
            </div>
            <div className="comment-text">{props.comment.text}</div>
            <div className="comment-date">{props.comment.creation}</div>
        </div>
    );

};
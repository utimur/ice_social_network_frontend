import React from "react";
import "./comment.css";
import avatar from "../../../../../assets/img/avatar.jpg";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {deletePost as deletePostAction} from "../../../../../actions/post";

export default function Comment(props) {
    const currentUser = useSelector(state => state.user.currentUser)

    function settingsClick(comment) {
        if(comment.settings == false){
            document.getElementById("comment-top-settings-menu-"+props.comment.id).style.display = "flex"
            comment.settings = true
        } else {
            document.getElementById("comment-top-settings-menu-"+props.comment.id).style.display = "none"
            comment.settings = false
        }
    }


    return (
        <div className="comment">
            {props.comment.settings = false}
            <div className="comment-top">
                <NavLink to={`/profile/${props.comment.userId}`}>
                    <div className="comment-top-img" style={props.comment.avatar != null ? {
                        backgroundImage: `url('data:image/jpeg;base64,${props.comment.avatar}`,
                    } : {backgroundImage:`url(${avatar})`}}/>
                </NavLink>
                <div className="comment-top-username"><NavLink to={`/profile/${props.comment.userId}`}>{props.comment.username}</NavLink></div>
                <button className="comment-top-settings" onClick={()=>settingsClick(props.comment)}/>
                <div id={"comment-top-settings-menu-"+props.comment.id} className="comment-top-settings-menu">
                    {currentUser.id == props.comment.userId &&
                    <div className="comment-top-settings-my">
                        <button className="comment-top-settings-menu-item" onClick={()=>props.deleteComment(props.comment)}>Delete</button>
                    </div>
                    }
                </div>
            </div>
            <div className="comment-text">{props.comment.text}</div>
            <div className="comment-date">{props.comment.creation}</div>
        </div>
    );

};
import React, {useEffect, useState, useRef} from "react";
import avatar from "../../../assets/img/avatar.jpg";
import axios from 'axios'
import "./profileInfo.css"
import {useSelector, useDispatch} from "react-redux";
import { updateUser} from '../../../actions/user'

import CreatePost from "./createPost/CreatePost";

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



    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${props.id}`)
            .then(response => {
                setUser(response.data)
            })
        axios
            .get(
                `http://localhost:8080/upload?user_id=${props.id}`,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                if(response.data.byteLength != 0){
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    avatarRef.current.style.backgroundImage = `url(data:;base64,${base64})`
                } else {
                    avatarRef.current.style.backgroundImage = `url(${avatar})`
                }

            });
    }, [])

    function sendFile() {
        const form = new FormData()
        form.append("file", inputRef.current.files[0])
        form.append("user_id", user_id)
        axios.post("http://localhost:8080/upload", form , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            var fr = new FileReader();
            fr.onload = function () {

                avatarRef.current.style.backgroundImage = `url(${fr.result})`;
            }
            fr.readAsDataURL(inputRef.current.files[0]);
        }).catch(response => alert("file is not loaded..."))
    }

    function statusChange(event) {
        updateStatusRef.current.style.display = "block"
    }

    function updateStatus() {
        dispatch(updateUser("status",statusRef.current.innerText))
        const newUser = currentUser
        newUser.status = statusRef.current.innerText
        console.log(newUser)
        axios.post("http://localhost:8080/profile", {
            username:newUser.username,
            password:newUser.password,
            status:newUser.status,
            online:newUser.online,
            name:newUser.name,
            surname:newUser.surname,
            email:newUser.email,
            id:newUser.id,
        }).then(response => console.log(response.data))
        updateStatusRef.current.style.display = "none"
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

    function deleteAvatar() {
        avatarRef.current.style.backgroundImage = `url(${avatar})`
        axios.post("http://localhost:8080/upload/delete", {
            "id":user_id
        }).then(response=> dialogRef.current.style.display = "none")
    }

    return (
        <div className={"profile-info"}>
            <div className="dialog-window"  ref={dialogRef}>
                <div className="dialog-text"> Do you really want to delete your avatar?</div>
                <div className="dialog-btns">
                    <button onClick={()=>deleteAvatar()}>Delete</button>
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
                        <button onClick={()=>updateStatus()} className="status-btn" ref={updateStatusRef} contentEditable="false">Update</button>
                    </div>
                    <div className="profile-btns">
                        <button className="profile-btn">Message</button>
                        <button className="profile-btn">Add friend</button>
                    </div>
                </div>
                <div className="avatar-flex" onMouseOver={user_id==user.id ? ()=>avatarMouse() : ""} onMouseOut={user_id==user.id ? ()=>avatarMouseOut() : ""}>
                    <div ref={avatarRef} className="avatar">
                    </div>
                    {user_id == user.id &&
                    <form name="uploader" method="POST">
                        <label htmlFor="avatar-input" ref={avatarLabelRef} className="avatar-label">Change</label>
                        <input id="avatar-input" className="avatar-input" name="file" type="file" ref={inputRef} onChange={() => sendFile()}/>
                    </form>
                    }
                    {user_id == user.id &&
                    <button className="avatar-delete-btn" ref={avatarDeleteRef} onClick={()=> dialogRef.current.style.display = "block"}></button>
                    }
                </div>
            </div>
            <CreatePost id={props.id}/>
        </div>
    );
};
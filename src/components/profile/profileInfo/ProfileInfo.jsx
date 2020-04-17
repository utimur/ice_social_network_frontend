import React, {useEffect, useState, useRef} from "react";
import avatar from "../../../assets/img/bboy_avatar.png";
import axios from 'axios'
import {useSelector} from "react-redux";

export default function ProfileInfo(props) {

    const [user, setUser] = useState({})
    const inputRef = useRef();
    const avatarRef = useRef();
    const user_id = useSelector(state => state.user.currentUser.id)



    useEffect(() => {
        axios.get(`http://localhost:8080/profile/${props.id}`)
            .then(response => setUser(response.data))
        axios
            .get(
                `http://localhost:8080/upload?user_id=${props.id}`,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                avatarRef.current.src ="data:;base64," + base64
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
                avatarRef.current.src = fr.result;
            }
            fr.readAsDataURL(inputRef.current.files[0]);
        }).catch(response => alert("file is not loaded..."))
    }

    return (
        <div className={"profile-flex"}>
            {}
            <img src={avatar} className="avatar" ref={avatarRef}/>
            {user_id == props.id &&
            <div>
                <form name="uploader" method="POST">
                    Отправить этот файл: <input name="file" type="file" ref={inputRef}/>
                </form>
                <button onClick={()=> sendFile()}>Загрузить</button>
            </div>
            }
            <div className={"user-info"}>
                <div className={"user-info-reg"}>
                    <div className={"username"}>{user.username}</div>
                    <div className={"id"}>id: {user.id}</div>
                </div>
                <div className={"user-info-data"}>
                    <div className={"name"}>{user.name}</div>
                    <div className={"surname"}>{user.surname}</div>
                </div>
            </div>
        </div>
    )
};
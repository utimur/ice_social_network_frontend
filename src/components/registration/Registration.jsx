import React, {useRef} from "react";
import './registration.css';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios'

export default function Registration() {
    const dispatch = useDispatch()
    const currentUser =  useSelector(state=> state.user.currentUser)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const surnameRef = useRef()

    function regButClick(){
        axios.post("http://localhost:8080/registration",
            {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                avatar: ""
            }).then(response => alert("success"))
            .catch(response => alert("user already exists"))
    }

    return(
        <div className="container">
            <div className="registration-flex">
                <p className="reg-p">Registration</p>
                <form>
                    <p>Username</p>
                    <input placeholder="Enter username" ref={usernameRef} className="form-control"/>
                    <p>Password</p>
                    <input type="password" placeholder="Enter password"  ref={passwordRef} className="form-control"/>
                    <div className="delimeter"></div>
                    <p>Your name</p>
                    <input  placeholder="Enter your name"  ref={nameRef} className="form-control"/>
                    <p>Your surname</p>
                    <input placeholder="Enter your surname"  ref={surnameRef} className="form-control"/>
                    <label> <input type="checkbox"/> I agree with statement </label>
                </form>
                <button className="btn" onClick={()=>regButClick()} >Sign up</button>

            </div>
        </div>
    )
}
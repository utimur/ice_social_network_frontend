import React, {useRef} from "react";
import './registration.css';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios'
import {registrationEffect} from "../../effect/user";

export default function Registration() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const surnameRef = useRef()
    const emailRef = useRef()

    function regButClick(){
        registrationEffect(usernameRef, passwordRef,nameRef,surnameRef,emailRef)
    }

    return(
            <div className="login-flex reg-flex">
                <p className="header">Registration</p>
                <form>
                    <input placeholder="Enter username..." ref={usernameRef} className="form-control"/>
                    <input type="password" placeholder="Enter password..."  ref={passwordRef} className="form-control"/>
                    <input  placeholder="Enter your name..."  ref={nameRef} className="form-control"/>
                    <input placeholder="Enter your surname..."  ref={surnameRef} className="form-control"/>
                    <input placeholder="Enter your email..." type="email" ref={emailRef} className="form-control"/>
                </form>
                <div className="btns">
                    <input id="reg-checkbox" className="login-checkbox" type="checkbox"/>
                    <label for="reg-checkbox" className="checkbox-label"><span></span> I agree with terms </label>
                    <button className="login-btn" onClick={()=>regButClick()} >Sign up</button>
                </div>
            </div>
    )
}
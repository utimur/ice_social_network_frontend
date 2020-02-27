import React from "react";
import './navbar.css'
import logo from '../../assets/img/phalcon.png'
import {NavLink} from "react-router-dom";

export default function Navbar() {
    return (
        <div className="row navrow">
            <div className="col-1 logo-div">
                <img src={logo} className="logo"/>
            </div>
            <div className="col-2">
                <p className="log-name text-uppercase"><NavLink to="/chat">Phalcon</NavLink></p>
            </div>

            <div className="col-1 offset-6 sign-div">
                <p className="sign"><NavLink to="/login">Sign in</NavLink></p>
            </div>
            <div className="col-1 sign-div">
                <p className="sign"><NavLink to="/registration">Sign up</NavLink></p>
            </div>
        </div>
    )

};
import React from "react";
import './navbar.css'
import logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../actions/user";

export default function Navbar(props) {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    function logOutClick() {
        dispatch(logOut())
    }

    return (
        <div className={"nav"}>
                <img src={logo} className="logo"/>
                <NavLink to="/" className="logo-name">ICE</NavLink>
                {
                    user.isLoggedIn  ?
                        (
                            <div className="sign">
                                <NavLink to="/"> <button className="logout-btn" onClick={()=>logOutClick()}>Log out</button></NavLink>
                            </div>
                        ) : (
                            <div>
                                <NavLink className="sign" to="/login">Log in</NavLink>
                                <NavLink className="sign"  to="/registration">Sign up</NavLink>
                            </div>
                        )
                }
        </div>
    )

};
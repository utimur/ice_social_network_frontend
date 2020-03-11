import React from "react";
import './navbar.css'
import logo from '../../assets/img/phalcon.png'
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
        <div className="row navrow">
            <div className="col-1 logo-div">
                <img src={logo} className="logo"/>
            </div>
            <div className="col-2">
                <p className="log-name text-uppercase"><NavLink to="/">Phalcon</NavLink></p>
            </div>

            {
                user.isLoggedIn  ?
                    (
                        <div className="col-1 offset-6 sign-div">
                            <p className="sign" onClick={()=>logOutClick()}><NavLink to="/">Log out</NavLink></p>
                        </div>
                    ) : (
                    <div className="col-3 offset-6 sign-div">
                        <div >
                              <NavLink className="sign" to="/login">Sign in</NavLink>
                            <NavLink className="sign"  to="/registration">Sign up</NavLink>
                        </div>
                    </div>
                    )
            }

        </div>
    )

};
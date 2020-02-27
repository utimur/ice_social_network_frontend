import React, {useRef} from "react";
import './registration.css';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios'

export default function Registration() {
    const dispatch = useDispatch()
    const currentUser = {}
    const usernameRef = useRef()
    const passwordRef = useRef()

    function regButClick(){
        if(usernameRef.current.value == "" || passwordRef.current.value == "")
        {
            alert("Fill in the input fields")
            return;
        }
        if(usernameRef.current.value.length < 5 || passwordRef.current.value.length < 5)
        {
            alert("Password and username at least 5 characters")
            return;
        }
        axios.post("http://localhost:8080/registration",
            {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }).then(response => console.log(response.data))
            .catch(response => alert("user already exists"))
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
                <p className="reg-p">Registration</p>
                <form>
                    <input placeholder="Enter username" ref={usernameRef} className="form-control"/>
                    <input type="password" placeholder="Enter password"  ref={passwordRef} className="form-control"/>
                    <button className="btn btn-primary" onClick={()=>regButClick()} >Sign up</button>
                </form>
            </div>
        </div>
    )
}
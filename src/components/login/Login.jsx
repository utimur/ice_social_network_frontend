import React, {useRef} from "react";
import './login.css';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios'
import {login} from "../../actions/user";

export default function Login() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const usernameRef = useRef()
    const passwordRef = useRef()

    function loginButClick(props){
        axios.post("http://localhost:8080/login",{
            username:usernameRef.current.value,
            password: passwordRef.current.value
        }).then(function (response) {
            dispatch(login(response.data))
            alert(response.data.username)
            alert(response.data.password)
            alert("SUCCESS")
        }).catch(response => console.log(response.data))
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
                <p className="reg-p">Login</p>
                <form>
                    <input placeholder="Enter username" ref={usernameRef} className="form-control"/>
                    <input type="password" placeholder="Enter password"  ref={passwordRef} className="form-control"/>
                    <button className="btn btn-primary" onClick={()=>loginButClick()} >Sign in</button>
                </form>
            </div>
        </div>
    )
}
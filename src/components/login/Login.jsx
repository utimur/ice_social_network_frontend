import React, {useRef} from "react";
import './login.css';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios'
import {signIn} from "../../actions/user";

export default function Login(props) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const username = useRef()
    const password = useRef()

    function loginButClick(){
        axios.post("http://localhost:8080/login", {
            'username':username.current.value,
            'password': password.current.value
        })
            .then(response => {
                dispatch(signIn(response.data));
                props.history.push(`/profile/${response.data.id}`)
                console.log(response.data)
            } )
            .catch(()=>alert("Uncorrect data"))
    }


    return(
        <div className="login-flex">
            <p className="header">Login</p>
            <form>
                <input placeholder="Enter username..." ref={username} className="form-control"/>
                <input type="password" placeholder="Enter password..."  ref={password} className="form-control"/>
            </form>
            <div className={"btns"}>
                <button className="forgot-btn"> Forgot password? </button>
                <button className="login-btn" onClick={()=>loginButClick()} >Log in</button>
            </div>
        </div>
    )
}
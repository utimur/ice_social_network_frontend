import React, {useEffect, useState} from "react";
import './dialogs.css';
import {getDialogs} from "../../actions/dialogs";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import axios from 'axios';

export default function Dialogs() {
    const user = useSelector(state => state.user.currentUser)
    const [dialogs, setDialogs] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8080/dialogs")
            .then(response => console.log(response.data))
    }, [])

    if (user.isLoggedIn == false) {
        return <Redirect to={"/login"}></Redirect>
    }
    return (
        <div>
            DIALOGS
        </div>
    )
};
import React, {useEffect} from "react";
import './dialogs.css';
import SearchInput from "../utils/searchInput/SearchInput";
import Dialog from "./dialog/Dialog";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {setDialogs} from "../../actions/dialogs";

export default function Dialogs() {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const dialogs = useSelector(state => state.dialogs.dialogs);


    useEffect(()=>{
        axios.get(`http://localhost:8080/dialog?id=${currentUser.id}`)
            .then(response => {
                console.log(response.data)
                dispatch(setDialogs(response.data));
            })

    }, [])

    return (
        <div className="dialogs">
            <div className="search"><SearchInput/></div>
            <div className="dialogs-flex">
                {dialogs.map(dialog =>
                    <Dialog dialogId={dialog.id} friendId={dialog.friend.id} dialog={dialog}/>
                )}
            </div>
        </div>
    )
};
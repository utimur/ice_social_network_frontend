import React, {useEffect, useState} from "react";
import axios from 'axios'
import './users.css'
import {NavLink} from "react-router-dom";

export default function Users(props) {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/users")
            .then(response=> setUsers(response.data))
    }, [])

    return (
        <div className={"users-flex"}>
            {users.map(user =>
                <NavLink to={`/profile/${user.id}`}>
                    <p key={user.id}>
                        {user.id + " " + user.username}
                    </p>
                </NavLink>
            )}
        </div>
    )
}
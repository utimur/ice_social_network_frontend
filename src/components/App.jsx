import React from "react";
import Chat from "./chat/Chat";
import Navbar from "./navbar/Navbar";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import LeftBar from "./leftBar/LeftBar";
import {Route, BrowserRouter} from 'react-router-dom'
import Profile from "./profile/Profile";
import {useSelector} from "react-redux";
import "./app.css"
import Users from "./users/Users";
import Dialogs from "./dialogs/Dialogs";

export default function App() {
    const user = useSelector(state => state.user.currentUser)


    return (
        <BrowserRouter>
            <div className={"main"}>
                    <Navbar/>
                        {user.isLoggedIn == true &&
                              <LeftBar/>
                        }
                            <Route path="/chat" component={Chat}/>
                            <Route path="/profile/:id" component={Profile}/>
                            <Route path="/users" component={Users}/>
                            <Route path="/dialogs" component={Dialogs}/>
                        <Route path="/registration" component={Registration} />
                        <Route path="/login" component={Login}/>
            </div>
        </BrowserRouter>

    )
}
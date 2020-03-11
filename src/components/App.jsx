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

export default function App() {
    const user = useSelector(state => state.user.currentUser)


    return (
        <BrowserRouter>
            <div >
                <div className="row">
                    <Navbar/>
                </div>
                <div className="container">
                    <div className="content-flex">
                        {user.isLoggedIn == true &&
                          <div className="left-bar">
                              <LeftBar/>
                          </div>
                        }
                            <Route path="/chat" component={Chat}/>
                            <Route path="/profile" component={Profile}/>
                        <Route path="/registration" component={Registration} />
                        <Route path="/login" component={Login}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>

    )
}
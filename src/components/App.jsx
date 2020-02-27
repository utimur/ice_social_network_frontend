import React from "react";
import Chat from "./chat/Chat";
import Navbar from "./navbar/Navbar";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import {Route, BrowserRouter} from 'react-router-dom'

export default function App() {
    return (
        <BrowserRouter>
            <div >
                <Navbar/>
                <div className="container">
                    <Route path="/registration" component={Registration} />
                    <Route path="/chat" component={Chat}/>
                    <Route path="/login" component={Login}/>
                </div>
            </div>
        </BrowserRouter>

    )
}
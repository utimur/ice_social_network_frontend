import React from "react";
import Navbar from "./navbar/Navbar";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import LeftBar from "./leftBar/LeftBar";
import {Route, BrowserRouter} from 'react-router-dom'
import Profile from "./profile/Profile";
import {useSelector} from "react-redux";
import "./app.css"
import Dialogs from "./dialogs/Dialogs";
import FriendList from "./friendList/FriendList";
import Chat from "./dialogs/chat/Chat";
import FollowersList from "./followersList/FollowersList";

export default function App() {
    const user = useSelector(state => state.user)


    return (
        <BrowserRouter>
            <div className={"main"}>
                <Route component={Navbar}/>
                <div className="content-flex">
                    {user.isLoggedIn == true &&
                         <Route component={LeftBar}/>
                    }
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/friends/:id" component={FriendList}/>
                    <Route path="/followers/:id" component={FollowersList}/>
                    <Route path="/dialogs/" component={Dialogs}/>
                    <Route path="/chat/:id" component={Chat}/>
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login}/>
                </div>
            </div>
        </BrowserRouter>

    )
}
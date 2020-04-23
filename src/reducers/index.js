import {combineReducers} from "redux";
import message from "./message";
import user from "./user";
import dialogs from "./dialogs";
import post from "./post"

export default combineReducers({
    message,
    user,
    dialogs,
    post
})
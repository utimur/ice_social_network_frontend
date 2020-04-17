import {combineReducers} from "redux";
import message from "./message";
import user from "./user";
import dialogs from "./dialogs";

export default combineReducers({
    message,
    user,
    dialogs,
})
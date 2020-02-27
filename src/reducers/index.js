import {combineReducers} from "redux";
import message from "./message";
import user from "./user";

export default combineReducers({
    message,
    user,
})
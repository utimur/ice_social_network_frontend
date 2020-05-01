import React from "react";
import './dialogs.css';
import SearchInput from "../utils/searchInput/SearchInput";
import Dialog from "./dialog/Dialog";

export default function Dialogs() {

    return (
        <div className="dialogs">
            <div className="search"><SearchInput/></div>
            <div className="dialogs-flex">
                <Dialog/>
                <Dialog/>
                <Dialog/>
                <Dialog/>
            </div>
        </div>
    )
};
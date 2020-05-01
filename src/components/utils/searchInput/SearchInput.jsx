import React from "react";
import "./searchInput.css"

export default function SearchInput() {

    return(
        <div className="search-box">
            <input placeholder="Find your friend" className="search-input"/>
            <button className="search-btn"/>
        </div>
    )

};
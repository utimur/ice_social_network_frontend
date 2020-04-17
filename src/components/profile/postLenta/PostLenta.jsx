import React from "react";
import Logo from "../../../assets/img/instagram.png";
import "./postLenta.css";

export default function PostLenta() {

    return(
        <div className={"lenta-flex"}>
            <div className="post">
                <p>Описание к посту</p>
                <img src={Logo}/>
            </div>
            <div className="post">
                <p>Описание к посту</p>
                <img src={Logo}/>
            </div>
            <div className="post">
                <p>Описание к посту</p>
                <img src={Logo}/>
            </div>
        </div>
    )
}
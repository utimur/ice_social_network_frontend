import React from "react";
import './dialog.css';

export default function Dialog(props) {

    return (
        <div className="dialog">
            <div className="dialog-img"></div>
            <div className="dialog-content">
                <div className="dialog-content-username">Ульби Тимур</div>
                <div className="dialog-content-message">Привет как дела?</div>
            </div>
            <div className="dialog-date">15:22 26.04.2020</div>
        </div>
    );
};
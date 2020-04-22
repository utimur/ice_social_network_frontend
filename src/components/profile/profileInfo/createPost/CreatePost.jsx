import React from 'react'
import "./createPost.css"

export default function CreatePost() {

    return (
        <div className="post-creator">
            <textarea className="create-area" placeholder="Share your news..."></textarea>
            <div className="post-btns">
                <button className="skrepka-btn"></button>
                <button className="post-btn">Add post</button>
            </div>
        </div>
    )


};
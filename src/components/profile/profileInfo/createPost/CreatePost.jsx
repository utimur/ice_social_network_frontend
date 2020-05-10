import React, {useRef} from 'react'
import "./createPost.css"
import {useDispatch, useSelector,} from "react-redux";
import {createPost} from "../../../../effect/post";

export default function CreatePost(props) {

    const textRef = useRef()
    const dispatch = useDispatch()
    const fileInputRef = useRef()
    const loadedRef = useRef()
    const loadedImgRef = useRef()
    const currentUser = useSelector(state => state.user.currentUser)

    function screpkaClick() {
        loadedRef.current.style.display = "block"
        var fr = new FileReader();
        fr.onload = function () {
            loadedImgRef.current.style.backgroundImage = `url(${fr.result})`
        }
        fr.readAsDataURL(fileInputRef.current.files[0]);
    }

    return (
        <div className="post-creator">
            <div className="post-creator-flex">
                <textarea className="create-area" placeholder="Share your news..." ref={textRef}/>
                <div className="post-btns">
                    <label htmlFor="post-file" className="file-label"/>
                    <input type="file" id="post-file" onChange={() => screpkaClick()} ref={fileInputRef}
                           className="skrepka-btn"/>
                    <button className="post-btn"
                            onClick={() => createPost(currentUser, props, fileInputRef, textRef, dispatch, loadedRef)}>Add post</button>
                </div>
                <div className="loaded" ref={loadedRef}>
                    <div className="loaded-img" ref={loadedImgRef}></div>
                </div>
            </div>
        </div>
    )


};
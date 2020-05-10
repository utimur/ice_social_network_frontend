import axios from 'axios';
import {addPost} from "../actions/post";

export function createPost(currentUser, props, fileInputRef, textRef, dispatch, loadedRef) {
    const formData = new FormData()
    formData.append("creator_id", currentUser.id)
    formData.append("user_id", props.id)
    formData.append("img", fileInputRef.current.files[0])
    formData.append("text",  textRef.current.value)

    axios.post("http://localhost:8080/post",formData,{
        headers: {
            'Content-Type' : 'multipart/form-data'
        }}).then(response => {
        dispatch(addPost(response.data))
        loadedRef.current.style.display = "none"
    })
}
import axios from 'axios';
import {signIn, updateUser} from "../actions/user";
import avatar from "../assets/img/avatar.jpg";

export function loginEffect(username, password, props,dispatch) {
    axios.post("http://localhost:8080/login", {
        'username':username.current.value,
        'password': password.current.value
    })
        .then(response => {
            dispatch(signIn(response.data));
            props.history.push(`/profile/${response.data.id}`)
            console.log(response.data)
        } )
        .catch(()=>alert("Uncorrect data"))
}

export function registrationEffect(usernameRef, passwordRef, nameRef, surnameRef, emailRef) {
    axios.post("http://localhost:8080/registration",
        {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            online: "online",
        }).then(response => alert("success"))
        .catch(response => alert("user already exists"))
}

export function getFollowers(props, setFollowers) {
    axios.get(`http://localhost:8080/friends/followers?id=${props.id}`)
        .then(response=>{
            if(response.data.length > 5){
                setFollowers(response.data.slice(0,5));
            } else {
                setFollowers(response.data);
            }
        })
}

export function getFollowing(props, setFollowing) {
    axios.get(`http://localhost:8080/friends/following?id=${props.id}`)
        .then(response=>{
            if(response.data.length > 5){
                setFollowing(response.data.slice(0,5));
            } else {
                setFollowing(response.data);
            }
        })
}

export function getFriends(props, setFriends) {
    axios.get(`http://localhost:8080/friends?id=${props.id}`)
        .then(response=>{
            if(response.data.length > 3){
                setFriends(response.data.slice(0,3));
            } else {
                setFriends(response.data);
            }
        })
}

export function getIsFriend(currentUser, props, setIsFriend) {
    axios.get(`http://localhost:8080/friends/find?id=${currentUser.id}&friend_id=${props.id}`)
        .then(responce => {
            if (responce.data) {
                console.log(responce.data)
                setIsFriend(true);
            }
        })
}

export function getProfile(props, setUser) {
    axios.get(`http://localhost:8080/profile/${props.id}`)
        .then(response => {
            setUser(response.data)
        })
}

export function sendFile(inputRef, user_id, dispatch, setAvatarChange, avatarChange) {
    const form = new FormData()
    form.append("file", inputRef.current.files[0])
    form.append("user_id", user_id)
    axios.post("http://localhost:8080/upload", form , {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    }).then(response => {
       setAvatarChange(avatarChange+1)
    }).catch(response => alert("file is not loaded..."))
}

export function updateStatus(statusRef,updateStatusRef, currentUser, dispatch) {
    dispatch(updateUser("status",statusRef.current.innerText))
    const newUser = currentUser
    newUser.status = statusRef.current.innerText
    console.log(newUser)
    axios.post("http://localhost:8080/profile", {
        username:newUser.username,
        password:newUser.password,
        status:newUser.status,
        online:newUser.online,
        name:newUser.name,
        surname:newUser.surname,
        email:newUser.email,
        avatar:newUser.avatar,
        avatarStr: newUser.avatarStr,
        id:newUser.id,
    }).then(response => console.log(response.data))
    updateStatusRef.current.style.display = "none"
}

export function deleteAvatar(avatarRef, user_id, dialogRef, setAvatarChange, avatarChange) {

    axios.post("http://localhost:8080/upload/delete", {
        "id":user_id
    }).then(response=> {
        dialogRef.current.style.display = "none";
        setAvatarChange(avatarChange+1)
    })
}

export function follow(currentUser, props, setIsFriend) {
    axios.post("http://localhost:8080/friends", {
        id:currentUser.id,
        friendId:props.id
    }).then(response=>{
        setIsFriend(true);
        // setFollowing([...followers, response.data])
    })
}

export function unfollow(currentUser, props, setIsFriend) {
    axios.delete(`http://localhost:8080/friends?id=${currentUser.id}&friend_id=${props.id}`)
        .then(response => {
            setIsFriend(false);
            console.log(response.data)
        })
}

export function getFollowersList(setFollowers,type,id) {
    axios.get(`http://localhost:8080/friends/${type}?id=${id}`)
        .then(response => setFollowers(response.data))
}




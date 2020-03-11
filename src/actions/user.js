export const signIn = (user) => {
    return {
        type: "LOGIN",
        payload: user,
    }
}

export const logOut = () => {
    return {
        type : "LOGOUT",
        payload: ""
    }
}
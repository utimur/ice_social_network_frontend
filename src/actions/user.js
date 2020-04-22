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

export const updateUser = (field, value) => {
    return {
        type: "UPDATE_USER",
        field: field,
        payload: value
    }
}
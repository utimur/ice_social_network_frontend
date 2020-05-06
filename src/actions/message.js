export const getMessages = (msgs) => {
    return {
        type: "GET_MESSAGES",
        payload: msgs
    }
}

export const addMessage = (msg) => {
    return{
        type: "ADD_MESSAGE",
        payload: msg
    }
}

export const setMessage = (dialogId) => {
    return {
        type: "SET_DIALOG",
        payload: dialogId
    }
}
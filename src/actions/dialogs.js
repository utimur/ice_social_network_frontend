export const getDialogs = (dialogs) => {
    return {
        type: "GET_DIALOGS",
        payload: dialogs,
    }
}
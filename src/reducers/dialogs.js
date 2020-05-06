const defaultState =  {
    dialogs: [],
}

export default function dialogs(state = defaultState, action) {
    switch (action.type) {
        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: action.payload
            }
        default:
            return {...state};
    }
}
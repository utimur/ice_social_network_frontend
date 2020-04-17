const defaultState =  {
    dialogs: [],
}

export default function dialogs(state = defaultState, action) {
    switch (action.type) {
        case "GET_DIALOGS":
            return {
                ...state,
                dialogs: [...state.dialogs, action.payload]
            }
        default:
            return {...state};
    }
}
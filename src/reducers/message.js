const defaultState = {
    messages:[],
    dialogId:0
}

export default function message(state = defaultState, action) {
    switch (action.type) {
        case "GET_MESSAGES":
            return {
                ...state,
                messages: [...action.payload]
            }
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case "SET_DIALOG":
            return {
                ...state,
                dialogId: action.payload
            }

        default:
            return {...state}
    }
}
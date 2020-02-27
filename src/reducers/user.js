const defaultState = {
    currentUser: {
        username:"",
        password:""
    }
}

export default function user(state = defaultState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: {
                    username:action.payload.username,
                    password: action.payload.password
                }
            };
        default:
            return {...state}
    }
}
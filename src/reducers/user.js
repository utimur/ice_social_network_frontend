const defaultState = {
    currentUser: {
        id: 0,
        username:"",
        password:"",
        isLoggedIn:false,
    }
}

export default function user(state = defaultState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: {
                    username:action.payload.username,
                    password:action.payload.password,
                    id:action.payload.id,
                    isLoggedIn: true,
                },
            };
        case "LOGOUT":
            return {
                ...state,
                currentUser: {
                    username:"",
                    password:"",
                    id:0,
                    isLoggedIn: false,
                }
            }
        default:
            return {...state}
    }
}
const defaultState = {
    currentUser: {
        id: 0,
        username:"",
        password:"",
        name:"",
        surname:"",
        status:"",
        online:"",
        email:"",
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
                    status:action.payload.status,
                    online:action.payload.online,
                    name:action.payload.name,
                    surname:action.payload.surname,
                    email:action.payload.email,
                    isLoggedIn: true,
                },
            };
        case "LOGOUT":
            return {
                ...state,
                currentUser: {
                    username:"",
                    password:"",
                    status:"",
                    online:"",
                    name:"",
                    surname:"",
                    email:"",
                    id:0,
                    isLoggedIn: false,
                }
            }
        case "UPDATE_USER":
            return {
                ...state,
                currentUser : {
                    ...state.currentUser,
                    [action.field]: action.payload
                }
            }
        default:
            return {...state}
    }
}
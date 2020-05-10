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
        avatarStr:"",
        friendsCount:0,
        followersCount:0,
        followingCount:0,
        groupsCount:0,
        friends:[]
    },
    isLoggedIn:false,
}

export default function user(state = defaultState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
            };
        case "LOGOUT":
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false,
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
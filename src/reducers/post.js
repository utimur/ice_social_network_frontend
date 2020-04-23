const defaultState = {
    posts:[

    ]
}

export default function post(state = defaultState, action) {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
        case "GET_POSTS":
            return {
                ...state,
                posts: action.payload
            }
        case "UPDATE_POSTS":
            return {
                ...state,
                posts:action.payload
            }
        case "DELETE_POST":
            return {
                ...state,
                posts:action.payload
            }
        default:
            return {...state};
    }
}
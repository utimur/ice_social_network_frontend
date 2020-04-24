

export const addPost = (post) => {
    return {
        type: "ADD_POST",
        payload: post
    }
}


export const getPosts = (posts) => {
    return {
        type: "GET_POSTS",
        payload: posts
    }
}

export const updatePost = (posts) => {
    return{
        type: "UPDATE_POSTS",
        payload: posts
    }
}
export const deletePost = (posts) => {
    return{
        type: "DELETE_POST",
        payload: posts
    }
}
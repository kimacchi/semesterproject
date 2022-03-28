export const setCurrentUser = (username, userid)=>{
    return(dispatch)=>{
        dispatch({
            type: "SET_USER",
            username,
            userid
        })
    }
}


export const delCurrentUser = ()=>{
    return(dispatch)=>{
        dispatch({
            type: "DELETE_USER",
        })
    }
}


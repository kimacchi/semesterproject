export const getUsers = ()=>{
    return(dispatch)=>{
        dispatch({
            type: "GET_USER"
        });
    }
}

export const addUser = (Username, UserPassword, Email )=>{
    return(dispatch)=>{
        dispatch({
            type: "ADD_USER",
            userInfo: {
                Username,
                UserPassword,
                Email
            }
        })
    }
}
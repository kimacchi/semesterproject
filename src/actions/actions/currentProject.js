export const setCurrentProject = (projectId)=>{
    return(dispatch)=>{
        dispatch({
            type: "SET_PROJECT",
            projectId
        })
    }
}
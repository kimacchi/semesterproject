export const setCurrentTodo = (projectId, todoList)=>{
    return (dispatch)=>{
        dispatch({
            type: "SET_TODO",
            projectId,
            todoList
        })
    }
}

export const delCurrentTodo = ()=>{
    return (dispatch)=>{
        dispatch({
            type: "DEL_TODO",
        })
    }
}

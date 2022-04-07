export const setCurrentTodo = (projectId, todoList, todoId)=>{
    return (dispatch)=>{
        dispatch({
            type: "SET_TODO",
            projectId,
            todoList,
            todoId
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

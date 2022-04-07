export default (state = {}, action)=>{
    switch(action.type){
        case "SET_PROJECT":
            return {
                projectId: action.projectId,
                todoList: action.todoList,
                todoId: action.todoId
            };
        case "DEL_PROJECT":
            return {};
        default:
            return state;
    }
}
export default (state = {}, action)=>{
    switch(action.type){
        case "SET_TODO":
            return {
                projectId: action.projectId,
                todoList: action.todoList,
            };
        case "DEL_TODO":
            return {};
        default:
            return state;
    }
}
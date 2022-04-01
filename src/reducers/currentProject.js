export default (state = {}, action)=>{
    switch(action.type){
        case "SET_PROJECT":
            return {
                projectId: action.projectId
            };
        case "DEL_PROJECT":
            return {};
        default:
            return state;
    }
}
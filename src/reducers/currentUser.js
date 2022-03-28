export default (state = {}, action)=>{
    switch(action.type){
        case "SET_USER":
            return {
                username: action.username,
                userId: action.userid
            };
        case "DEL_USER":
            return {};
        default:
            return state;
    }
}
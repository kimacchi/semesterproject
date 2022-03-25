var axios = require("axios");


export default (state=[], action)=>{
    switch(action.type){
        case "ADD_GAME":
            axios.post("http://localhost:5000/api/games", {
                ...action.gameData
            });
            return [...state, action.gameData]
        case "GET_GAME":
            return [...axios.get("http://localhost:5000/api/games").data];
        default:
            return [state];
    }
}
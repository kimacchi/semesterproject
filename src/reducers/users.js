
var axios = require("axios");


export default (state = [], action)=>{
    switch(action.type){
        case "ADD_USER":
            axios.post("http://localhost:5000/api/users", {
                ...action.userInfo
            });
            return [...state, action.userInfo];
        case "GET_USER":
            axios.get("http://localhost:5000/api/users").then((data)=>{
                console.log(data)
                return [...data.data];
            })
            // return [...axios.get("http://localhost:5000/api/users").data];
        default:
            return state;
    }
}
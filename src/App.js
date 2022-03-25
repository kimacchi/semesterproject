import {useState, useEffect} from "react";
import Board from "./Components/Board";

var axios = require("axios");


function App() {
  const [state, setState] = useState([]);

  // const getUsers =  ()=>{
  //   axios.get("http://localhost:5000/api/users").then((res) => {
  //     console.log(res);
  //   }).catch(err => { console.log(err)})
  // }

  // const addUser = ()=>{
  //   axios.post("http://localhost:5000/api/users", {
  //     "Username": "dfkgj",
  //     "UserPassword": "kkkkkkkkkkkkk",
  //     "BestTime": "50cvb4 seconds",
  //     "Email": "hhhsjvb@hotmail.com"
  //   });
  //   setTimeout(()=>getUsers(),500);
  // }

  // useEffect(()=>{
  //   getUsers();
  // })

  console.log(state);

  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;

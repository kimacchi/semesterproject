import {useState, useEffect} from "react";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Board from "./Components/Board";
import LoginPage from "./Components/LoginPage";
import "normalize.css";
import "./styles/styles.scss";

var axios = require("axios");


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} exact={true} />
            <Route path="/game" element={<Board/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

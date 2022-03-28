import {useState, useEffect} from "react";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import "normalize.css";
import "./styles/styles.scss";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} exact={true} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import "normalize.css";
import "./styles/styles.scss";
import Home from "./Components/Home";
import { AnimatePresence } from "framer-motion";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<Home/>} />
      </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;

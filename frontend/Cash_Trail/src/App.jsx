import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expence from  "./pages/Dashboard/Expence";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";


const App = () => {
  console.log("App");
  return (
    <UserProvider> 
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expence />} />
        </Routes>
      </Router>    
    </div>

    <Toaster
      toastOptiions={{
        className: "",
        style: {
          fontSize: "13px"
        },
      }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {

   console.log("App");

  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
  <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
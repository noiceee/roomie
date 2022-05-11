import React from "react";
import "./App.scss";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/search/SearchPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import axios from "axios";
import Creation from "./pages/creation/Creation";
import View from "./pages/view/View";
import YourPosts from "./pages/yourPosts/YourPosts";

function App() {
  axios.defaults.baseURL = "http://localhost:4040/api";
  const user = localStorage.getItem("loggedUser");
  return (
    <div className="app">
      <Switch>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/creation"
          element={user ? <Creation /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/view"
          element={user ? <View /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/posts"
          element={user ? <YourPosts /> : <Navigate to={"/login"} />}
        />
        <Route path="/search" element={<SearchPage />} />
      </Switch>
    </div>
  );
}

export default App;

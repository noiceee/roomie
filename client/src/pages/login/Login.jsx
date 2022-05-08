import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./login.scss";
import { useRef } from "react";

export default function Login() {
const email = useRef();
const password = useRef();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/user/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("loggedUser", JSON.stringify(res.data));
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <h1>ROOMIE</h1>
        </div>
      </div>
      <div className="container">
        <form onSubmit={submitHandler}>
          <h1>Sign In</h1>
          <input ref={email} type="email" placeholder="Email" />
          <input ref={password} type="password" placeholder="Password" />
          <button type="submit" className="login-button">Sign In</button>
          <span>
            New to Roomie?
            <Link to="/signup">
              <b>Sign Up Now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more.</b>
          </small>
        </form>
      </div>
    </div>
  );
}

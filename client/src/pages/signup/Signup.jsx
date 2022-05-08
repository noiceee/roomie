import React, { useRef } from "react";
import axios from "axios";
import "./signup.scss";

export default function Signup() {
  const email = useRef("");
  const password = useRef("");
  const contact = useRef("");
  const name = useRef("");

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/user/signup", {
          email: email.current.value,
          password: password.current.value,
          contact: contact.current.value,
          name: name.current.value,
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
    <div className="signup">
      <div className="top">
        <div className="wrapper">
          <h1>ROOMIE</h1>
        </div>
      </div>
      <div className="container">
        <form onSubmit={submitHandler}>
          <h1>Welcome to Roomie!</h1>
          <input ref={name} type="text" placeholder="Enter your Name" />
          <input ref={email} type="email" placeholder="Enter your email" />
          <input ref={password} type="password" placeholder="Enter Password" />
          <input ref={contact} type="number" placeholder="Phone Number" />
          <button className="login-button" type="submit">
            Sign In
          </button>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more.</b>
          </small>
        </form>
      </div>
    </div>
  );
}

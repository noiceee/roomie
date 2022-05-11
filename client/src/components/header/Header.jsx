import React from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const user = localStorage.getItem("loggedUser");
  const [profileToggle, setProfileToggle] = useState(false);
  function profileToggler() {
    console.log(profileToggle);
    setProfileToggle((prev) => !prev);
  }
  function logOut() {
    localStorage.clear();
    profileToggler();
    window.location.href = "/";
  }
  function navigateToYourPosts() {
    window.location.href = "/posts";
  }
  function navigateToYourLogin() {
    window.location.href = "/login";
  }
  return (
    <div className="header">
      <Link to="/" className="header-logo">
        {/* <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                /> */}
        ROOMIE
      </Link>

      <div className="header__center">
        <input type="text" placeholder="Enter Location" />
        <SearchIcon />
      </div>

      <div className="header__right">
        <Link to={"/creation"}>
          <button>Post your home</button>
        </Link>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Avatar onClick={profileToggler} style={{ cursor: "pointer" }} />
        {!user ? (
          <div
            className="pop-up-wrapper"
            style={{ display: profileToggle ? "block" : "none" }}
          >
            <div className="logout" onClick={navigateToYourLogin}>
              Log In
            </div>
          </div>
        ) : (
          <div
            className="pop-up-wrapper"
            style={{ display: profileToggle ? "block" : "none" }}
          >
            <div className="logout" onClick={navigateToYourPosts}>
              Your Posts
            </div>
            <div className="logout" onClick={logOut}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

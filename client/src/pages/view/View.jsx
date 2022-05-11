import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./view.scss"

function View() {
  const { state } = useLocation();
  const {
    img,
    location,
    title,
    tenants,
    lookingFor,
    description,
    ownerName,
    price,
    contact,
  } = state;
  const [heart, setHeart] = useState(false);
  const [number, setNumber] = useState("Get Contact");
  function showContact (){
    const user = localStorage.getItem("loggedUser");
    if(user){
        setNumber(contact);
    }
  }
  return (
    <>
      <Header />
      <div className="view">
        <div className="searchResult">
          <img src={img} alt="" />
          <div className="stage searchResult__heart">
            <div
              className={`heart ${heart ? "is-active" : ""}`}
              onClick={() => setHeart((prev) => !prev)}
            ></div>
          </div>
          <div className="searchResult__info">
            <div className="searchResult__infoTop">
              <p className="location">{location}</p>
              <h3 className="title">{title}</h3>
              <p className="tenants">
                <i className="fa fa-user" aria-hidden="true"></i> {tenants}
              </p>
              <p className="lookingFor">Preferred : {lookingFor}</p>
              <p className="description">{description}</p>
            </div>

            <div className="searchResult__infoBottom">
              <p className="ownerName">Posted By : {ownerName}</p>
              <div className="searchResults__price">
                <h2>{price}</h2>
              </div>
            </div>

            <div className="get-contact" onClick={showContact}>
              {number}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default View;

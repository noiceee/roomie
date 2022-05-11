import React from "react";
import "./SearchResult.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchResult({
  id,
  img,
  location,
  title,
  description,
  tenants,
  price,
  lookingFor,
  ownerName,
  contact,
  showDelete
}) {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  function goToView() {
    navigate("/view", {
      state: {
        img,
        location,
        title,
        description,
        tenants,
        price,
        lookingFor,
        ownerName,
        contact
      },
    });
  }
  function deletePost(e){
    e.stopPropagation();
    axios.patch(`/homes/${id}`).then((found)=>{
      window.location.reload();
    });
  }
  return (
    <div className="searchResult" onClick={goToView}>
      <img src={img} alt="" />
      {/* <FavoriteBorderIcon className="searchResult__heart" /> */}
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

        {showDelete && <button className="delete-button" onClick={deletePost}>Delete</button>}
      </div>
    </div>
  );
}

export default SearchResult;

import React, { useRef, useState } from "react";
import "./SearchPage.scss";
import { Button } from "@material-ui/core";
import SearchResult from "../../components/searchResult/SearchResult";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import axios from "axios";

function SearchPage() {
  console.log(window.location.pathname);
  const [homeList, setHomeList] = useState([]);
  useEffect(() => {
    console.log("useEffect ran");
    axios
      .get("/homes/random")
      .then((res) => {
        setHomeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="searchPage">
        <div className="searchPage__info">
          <p>62 stays · 26 august to 30 august · 2 guest</p>
          <h1>Stays nearby</h1>
          <Button variant="outlined">Cancellation Flexibility</Button>
          <Button variant="outlined">Type of place</Button>
          <Button variant="outlined">Price</Button>
          <Button variant="outlined">Rooms and beds</Button>
          <Button variant="outlined">More filters</Button>
        </div>
        {homeList.map((home, i) => {
          return (
            <SearchResult
              key={home._id}
              img={home.img}
              title={home.title}
              description={home.desc}
              price={"₹ " + home.cost}
              lookingFor={home.lookingFor}
              location={home.location}
              tenants={home.tenants}
              ownerName={home.ownerName}
            />
          );
        })}
        {/* <SearchResult
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
          location="Private room in center of London"
          title="Stay at this spacious Edwardian House"
          description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
          star={4.73}
          price="£30 / night"
          total="£117 total"
        /> */}
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;

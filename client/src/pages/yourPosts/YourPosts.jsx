import React, { useState } from "react";
import "./YourPosts.scss";
import SearchResult from "../../components/searchResult/SearchResult";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import axios from "axios";

function SearchPage() {
  console.log(window.location.pathname);
  const [homeList, setHomeList] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("useEffect ran");
    axios
      .get(`/homes/find/${user.contact}`)
      .then((res) => {
          console.log(res);
        setHomeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="searchPage">
        {homeList.map((home, i) => {
          return (
            <SearchResult
              key={home._id}
              id={home._id}
              img={home.img}
              title={home.title}
              description={home.desc}
              price={"₹ " + home.cost}
              lookingFor={home.lookingFor}
              location={home.location}
              tenants={home.tenants}
              ownerName={home.ownerName}
              contact={home.contact}
              showDelete={true}
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

import { Button, createTheme, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./creation.scss";
import mansion from "./mansion.png";
import { ThemeProvider } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import S3FileUpload from "react-s3";

function Creation() {
  const [title, setTitle] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [tenants, setTenants] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#E97279",
      },
      secondary: {
        main: "#fff",
      },
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const payLoad = {
      title: title,
      lookingFor: lookingFor,
      img: "https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720",
      tenants: tenants,
      cost: cost,
      desc: desc,
      ownerName: loggedUser.name,
      contact: loggedUser.contact,
      location: location,
    };
    axios.post("/homes", payLoad);
    setIsSubmitted(true);
  }

  function onFileChange(file){
    //s3 bucket details

    const config = {
      bucketName: "",
      dirName: "",
      region: "",
      accessKeyId: "",
      secretAccessKey: "",
    };

    //upload file to s3

    S3FileUpload.uploadFile(file, config)
      .then((data) => {
        console.log(data.location); // it return the file url
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {!isSubmitted ? (
        <>
          <Header />
          <div className="creation">
            <div className="creation-wrapper">
              <div className="left">
                <div className="left-wrapper">
                  <img src={mansion} alt="Mansion" />
                  <h2>Find your perfect Roomies!</h2>
                </div>
              </div>
              <div className="middle-line"></div>
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    type="text"
                    name="lookingFor"
                    label="Looking For"
                    variant="outlined"
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                  />
                  <TextField
                    type="number"
                    name="tenants"
                    label="Number of Tenants"
                    variant="outlined"
                    value={tenants}
                    onChange={(e) => setTenants(e.target.value)}
                  />
                  <TextField
                    type="number"
                    name="cost"
                    label="Rent (₹)"
                    variant="outlined"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                  <TextField
                    type="text"
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <TextField
                    type="text"
                    name="desc"
                    label="Description"
                    variant="outlined"
                    multiline
                    minrows={4}
                    maxRows={4}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <input
                    type="file"
                    onChange={onFileChange}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="creation success">
          <div className="heading-wrapper">
            <h1>Yayy!! Room Posted</h1>
            <h4>You'll be hopefully soon contacted by your future roomie ;)</h4>
            <h5>Meanwhile, share your experience with us</h5>
          </div>
          <div className="social-icons">
            <div
              className="button"
              onClick={() => {
                window.location.href = "https://github.com/noiceee";
              }}
            >
              <i className="fa-brands fa-instagram"></i>
              <div className="fill"></div>
            </div>
            <div
              className="button"
              onClick={() => {
                window.location.href = "https://github.com/noiceee";
              }}
            >
              <i className="fa-brands fa-twitter"></i>
              <div className="fill"></div>
            </div>
            <div
              className="button"
              onClick={() => {
                window.location.href = "https://github.com/noiceee";
              }}
            >
              <i className="fa-brands fa-facebook"></i>
              <div className="fill"></div>
            </div>
            <div
              className="button"
              onClick={() => {
                window.location.href = "https://linkedin.com/in/kartikey69";
              }}
            >
              <i className="fa-brands fa-linkedin-in"></i>
              <div className="fill"></div>
            </div>
          </div>
          <Link to={"/"}>
            <Button>Take me to Home</Button>
          </Link>
        </div>
      )}
    </ThemeProvider>
  );
}

export default Creation;

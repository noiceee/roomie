const Home = require("../models/Home");

const router = require("express").Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const newHome = Home(req.body);
  newHome.save((err, home) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(home);
    }
  });
});

router.delete("/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(401).json(err);
    } else {
      req.status(200).json("Movie deleted");
    }
  });
});

//get 10 random Homes

router.get("/random", (req, res) => {
  Home.aggregate([
    { $match: { isActive: true } },
    { $sample: { size: 10 } }, //get a random mubhie
  ], (err, homes)=>{
    if(err)
    res.status(500).json(err);
    else
    res.status(200).json(homes);
  });
});

//GET home by id

router.get("/find/:contact", (req, res) => {
  Home.find({contact: req.params.contact, isActive: true}, (err, foundHome) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.status(200).json(foundHome);
    }
  });
});

router.patch("/:id", (req, res) => {
  Home.findByIdAndUpdate(req.params.id, {isActive: false}, (err, foundHome) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.status(200).json(foundHome);
    }
  });
});

module.exports = router;

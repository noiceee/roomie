const express = require('express');
const mongoose = require('mongoose');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
require('cors').apply();
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB Connected")
).catch(
    (err) => console.log(err)
);

app.use(express.json());
app.use("/api/homes", homeRouter);
app.use("/api/user", userRouter);


app.get("/", (req, res)=>{
    res.send("Server is working!");    
})

const PORT = process.env.PORT || 4040;
app.listen(PORT, ()=>{
    console.log("Server Running on Port :", PORT);
})
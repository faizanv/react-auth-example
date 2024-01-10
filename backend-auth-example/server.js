const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');


const userRoute = require("./routes/user");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// for CORS or better still install cors() library.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-CONTROL-Allow-Method", "POST, PATCH, DELETE, GET, PUT");
  next();
})


app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute);

app.use((req, res, next) => {
  res.status(404).json("Page not found!");
})

const mongo_uri = 'mongodb://localhost/react-auth'; 
mongoose.connect(mongo_uri)
  .then(response => {
      console.log(`connected to port ${process.env.PORT || 8080}`);
      app.listen(process.env.PORT || 8080);
  }).catch(err => {
      console.log('Failed to connect user to db')
      // throw new Error(err);

  })

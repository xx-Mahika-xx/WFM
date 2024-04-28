<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
require('dotenv').config();
const cors = require('cors');
=======
const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");
>>>>>>> 527126f5a6f5ce53e3cccb37d19a4b0d53f5384c
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mahirakajaria:UKG_HospitalWFM@cluster0.cqutfpg.mongodb.net/sample_mflix",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log(err);
  });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
      // done(error, doesTheUserExist)
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);


app.listen(port, () => {
  console.log("App is running on port " + port);
});

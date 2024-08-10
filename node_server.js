const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./Models/User");

dotenv.config();
const URI = process.env.mongoURI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = process.env.PORT || 5000;

app.post("/submit", async (req, res) => {
  try {
    const user = new User({
        username: req.body.username,
        First_name: req.body.firstname,
        Last_name: req.body.lastname,
        email: req.body.email,
        country: req.body.country,
        about: req.body.about,
    });
    await user.save();
    res.sendFile(__dirname + "/public/submit.html");
  } catch (error) {
    res.status(400).send("Error saving the submission: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

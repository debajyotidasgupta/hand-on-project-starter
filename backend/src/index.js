const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

app.post("/auth", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user)
      return res.status(401).json({
        message: "User does not exist",
      });
    else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Internal server error",
          });
        } else if (result) {
          return res.status(200).json({
            message: "User authenticated",
          });
        } else {
          return res.status(400).json({
            message: "Username/Password is incorrect",
          });
        }
      });
    }
  });
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email,
        password: hash,
      });

      user.save();
      return res.status(200).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Failed Signup",
      });
    });
});

app.post("/upload", (req, res) => {
  const { image } = req.body;
  const imageData = image.substring(image.indexOf(",") + 1);
  fs.writeFileSync("tmp.png", imageData, { encoding: "base64" });

  const inputPath = "tmp.png";
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    fs.createReadStream(inputPath),
    path.basename(inputPath),
  );

  axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    responseType: "arraybuffer",
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": `${process.env.REMOVE_BG_API_KEY}`,
    },
    encoding: "base64",
  })
    .then((response) => {
      if (response.status != 200)
        return console.error("Error:", response.status, response.statusText);

      console.log("Success:", response.status, response.statusText);
      return res.status(200).json({
        message: "Image uploaded successfully",
        image: response.data,
      });
      // fs.writeFileSync("../frontend/bg.png", response.data);
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const router = require('./router/router')

const path = require("path");

const PORT = 3333;
const URL = "mongodb://localhost:27017/Form";
const app = express();

app.use(express.json()); 
app.use('/api', router)
app.use("/media", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, async() => {
  await mongoose
    .connect(URL)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));
  console.log(`Server started on port ${PORT}...`);
});

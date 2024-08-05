const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// let allowed = ["http://localhost:3000", "other links"];
// function options(req, res) {
//   let tmp;
//   let origin = req.header("Origin");
//   if (allowed.indexOf(origin) >= 0) {
//     tmp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else
//     tmp = {
//       origin: "stupid",
//     };
//   res(null, tmp);
// }
//
// app.use(cors(options));

// Routes

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r))); // Automatically load all routes in the routes directory

// Database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to Mongoose Database : ", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


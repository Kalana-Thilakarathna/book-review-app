const express = require('express');
const app = express();
const mongoose = require('mongoose');
const reviewRoute = require('./routes/reviewRoutes')
const cors = require("cors");
require('dotenv').config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-Type"],
  })
);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


app.use("/reviews", reviewRoute);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
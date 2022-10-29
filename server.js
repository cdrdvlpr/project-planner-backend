require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const projectRoutes = require("./routes/projectRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// Cross Origin Resource Sharing
app.use((req, res, next) => {
  const corsWhitelist = ["https://project-planner.onrender.com"];

  if (corsWhitelist.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PATCH,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
});

// routes
app.use("/api/projects", projectRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 3500, "0.0.0.0", () => {
      console.log(
        `Connected to database & listening on port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

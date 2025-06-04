const http = require('http');
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));

const commonRoutes = require("./routes/commonRoutes");
const adminRoutes = require("./routes/adminRoutes");
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");

// Start the server
const startServer = async () => {
  try {
    // setupSessionMiddleware(schemas);

    app.use(commonRoutes);
    app.use(adminRoutes);
    app.use(companyRoutes);
    app.use(userRoutes);


    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Unable to start the server:", err);
  }
};

startServer();


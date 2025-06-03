const http = require('http');
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));

const commenRoutes = require("./routes/commen-routes");
const adminRoutes = require("./routes/admin-routes");

// Start the server
const startServer = async () => {
  try {
    // setupSessionMiddleware(schemas);

    app.use(commen-Routes);
    app.use(admin-Routes);
    app.use(user-Routes);
    app.use(company-Routes);


    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Unable to start the server:", err);
  }
};

startServer();


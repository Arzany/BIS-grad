const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const sequelize = require("./util/database");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "tzend",
};
const sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6 * 30 * 24 * 60 * 60 * 1000 }, // Lifetime 6 months in milliseconds
  })
);

const commonRoutes = require("./routes/commonRoutes");
const adminRoutes = require("./routes/adminRoutes");
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(commonRoutes);
app.use(adminRoutes);
app.use(companyRoutes);
app.use(userRoutes);

sequelize
  // .sync({ force: true })
  // .sync()
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to start the server:", err);
  });

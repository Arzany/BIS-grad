const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const multer = require("multer");

const sequelize = require("./util/database");

const User = require("./models/user");
const Applicant = require("./models/applicant");
const Application = require("./models/application");
const Article = require("./models/article");
const Company = require("./models/company");
const Job = require("./models/job");
const Payment = require("./models/payment");
const Feedback = require("./models/feedback");

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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/cv");
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const fileExtension = file.originalname.split(".").pop();
    const newFilename = `${randomNumber}-${Date.now()}.${fileExtension}`;
    cb(null, newFilename);
  },
});

app.use(multer({ storage: fileStorage }).single("cv"));

const commonRoutes = require("./routes/commonRoutes");
const adminRoutes = require("./routes/adminRoutes");
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(commonRoutes);
app.use(adminRoutes);
app.use(companyRoutes);
app.use(userRoutes);

// Define Relationships

// Company has many Jobs
Company.hasMany(Job);
Job.belongsTo(Company);

// Many-to-many (already present)
Applicant.belongsToMany(Job, { through: Application });
Job.belongsToMany(Applicant, { through: Application });

// For eager loading FROM Application (already present)
Application.belongsTo(Job);
Application.belongsTo(Applicant);

// ADD THIS for eager loading FROM Job:
Job.hasMany(Application); // <-- THIS IS MISSING
Application.belongsTo(Job); // (already present, but fine to repeat)

// Payment belongs to Applicant
Payment.belongsTo(Applicant);
Applicant.hasOne(Payment);

// Article and Video relationships (assuming they belong to Company)
Article.belongsTo(Company);
Company.hasMany(Article);

// One-to-one: Applicant hasOne User via userId (foreign key in Applicant)
Applicant.belongsTo(User, {
  foreignKey: "userId", // this will add `userId` column in the Applicant table
  as: "user",
});

User.hasOne(Applicant, {
  foreignKey: "userId", // ensure this points to the same field
  as: "applicant",
});

Company.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Company, {
  foreignKey: "userId",
  as: "company",
});

Feedback.belongsTo(Applicant, {
  foreignKey: "applicantId",
  as: "applicant",
  allowNull: true,
});

Applicant.hasMany(Feedback, {
  foreignKey: "applicantId",
  as: "feedback",
  allowNull: true,
});

Feedback.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
  allowNull: true,
});

Company.hasMany(Feedback, {
  foreignKey: "companyId",
  as: "feedback",
  allowNull: true,
});

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

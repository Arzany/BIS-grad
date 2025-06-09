const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Company = require("../models/company");
const Applicant = require("../models/applicant");
const Feedback = require("../models/feedback");
const Job = require("../models/job");

exports.getFeedback = async (req, res, next) => {
  try {
    res.render("feedback", {
      role: req.session && req.session.user ? req.session.user.role : null,
    });
  } catch (error) {
    console.error("Error fetching feedback page :", error);
  }
};

exports.postFeedback = async (req, res, next) => {
  try {
    const userType = req.body.userType;
    const rating = req.body.rating;
    const impNeeded = req.body.impNeeded;
    const recommend = req.body.recommend;
    const understood = req.body.understood;

    var applicantId, companyId;
    if (userType == "Applicant") {
      applicantId = req.session.xid;
    } else {
      companyId = req.session.xid;
    }

    const feedback = await Feedback.create({
      user_type: userType,
      rating: rating,
      imp_needed: impNeeded,
      recommend: recommend,
      understood: understood,
      applicantId: applicantId,
      companyId: companyId,
    });
    res.redirect("/home");
  } catch (error) {
    console.error("Error fetching feedback page :", error);
  }
};

exports.getFinalhome = async (req, res, next) => {
  try {
    res.render("home", {
      isLoggedIn: req.session.isLoggedIn || false,
      role: req.session && req.session.user ? req.session.user.role : null,
    });
  } catch (error) {
    console.error("Error fetching final home page :", error);
  }
};

exports.getLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error fetching Login page :", error);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .render("login", { error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .render("login", { error: "Invalid email or password" });
    }
    var company, applicant;
    if (user.role == "company") {
      company = await Company.findOne({ userId: user.id });
    } else if (user.role == "applicant") {
      applicant = await Applicant.findOne({ userId: user.id });
    }

    if (company) {
      req.session.xid = company.id;
    } else if (applicant) {
      req.session.xid = applicant.id;
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      if (user.role === "company" || user.role === "applicant") {
        res.redirect("/home");
      } else if (user.role === "admin") {
        res.redirect("/adminDashboard");
      }
    });
  } catch (err) {
    res
      .status(500)
      .render("login", { error: "An error occurred. Please try again." });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/home");
  });
};

exports.getRegister = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    console.error("Error fetching Register page :", error);
  }
};

exports.postRegister = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .render("register", { error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    var company, applicant;
    if (role == "company") {
      company = await Company.create({
        name: name,
        userId: user.id,
      });
    } else {
      applicant = await Applicant.create({
        name: name,
        userId: user.id,
      });
    }

    if (role == "company") {
      req.session.xid = company.id;
    } else {
      req.session.xid = applicant.id;
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      if (user.role === "company" || user.role === "applicant") {
        res.redirect("/home");
      }
      //  else if (user.role == 'admin') {
      //   res.redirect("/adminDashborad");
      // }
    });
  } catch (err) {
    res.status(400).render("register", { error: err.message });
  }
};

exports.getawareness = async (req, res, next) => {
  try {
    res.render("awareness");
  } catch (error) {
    console.error("Error fetching awareness page :", error);
  }
};

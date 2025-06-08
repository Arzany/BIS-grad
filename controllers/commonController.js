const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getFeedback = async (req, res, next) => {
  try {
    res.render("feedback");
  } catch (error) {
    console.error("Error fetching feedback page :", error);
  }
};

exports.postfeedback = async (req,res,next) => {
  
}








exports.getFinalhome = async (req, res, next) => {
  try {
    res.render("home", {
      isLoggedIn: req.session.isLoggedIn || false,
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
    res.render("home", {
      isLoggedIn: req.session ? req.session.isLoggedIn : false,
    });
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
  const { email, password, role } = req.body;
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

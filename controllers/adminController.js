const User = require("../models/user");



exports.getCompanylist = async (req, res, next) => {
  try {
    res.render("Companylist");
  } catch (error) {
    console.error("Error fetching Company list page :", error);
  }
};

exports.getUserlist = async (req, res, next) => {
  try {
    res.render("Userlist");
  } catch (error) {
    console.error("Error fetching User list page :", error);
  }
};

exports.getAdmindashboard = async (req, res, next) => {
  try {
    const companiesCount = await User.count({ where: { role: "company" } });
    const usersCount = await User.count({ where: { role: "applicant" } });
    res.render("admindashboard", {
      companiesCount: companiesCount,
      usersCount: usersCount,
    });
  } catch (error) {
    console.error("Error fetching Admin dashboard page :", error);
  }
};

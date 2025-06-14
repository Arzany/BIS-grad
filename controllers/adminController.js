const User = require("../models/user");
const Job = require("../models/job");
const Application = require("../models/application");
const Company = require("../models/company");
const Applicant = require("../models/applicant");
const Feedback = require("../models/feedback");

exports.getCompanylist = async (req, res, next) => {
  try {
    const companies = await Company.findAll();

    res.render("Companylist", { companies: companies });
  } catch (error) {
    console.error("Error fetching Company list page :", error);
  }
};

exports.getUserlist = async (req, res, next) => {
  try {
    const applicants = await Applicant.findAll();
    res.render("Userlist", {
      applicants: applicants,
    });
  } catch (error) {
    console.error("Error fetching User list page :", error);
  }
};

exports.getAdmindashboard = async (req, res, next) => {
  try {
    const companiesCount = await Company.count();
    const usersCount = await Applicant.count();
    const jobsCount = await Job.count();
    const appsCount = await Application.count();
    const feedbacks = await Feedback.findAll({
      include: [
        {
          model: Company,
          as: "company",
          required: false, // include even if companyId is null
        },
        {
          model: Applicant,
          as: "applicant",
          required: false, // include even if applicantId is null
        },
      ],
    });
    res.render("admindashboard", {
      companiesCount: companiesCount,
      usersCount: usersCount,
      jobsCount: jobsCount,
      appsCount: appsCount,
      feedbacks: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching Admin dashboard page :", error);
  }
};

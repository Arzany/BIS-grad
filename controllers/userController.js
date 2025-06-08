const Job = require("../models/job");
const Company = require("../models/company");
const Application = require("../models/application");
const Applicant = require("../models/applicant");

exports.getJobdetailedit = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: Company,
          attributes: ["name", "logo"],
        },
      ],
    });
    res.render("jobdetailedit", { job: job });
  } catch (error) {
    console.error("Error fetching Job detail edit page :", error);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    res.render("payment");
  } catch (error) {
    console.error("Error fetching Payment page :", error);
  }
};

exports.getPrice = async (req, res, next) => {
  try {
    res.render("price");
  } catch (error) {
    console.error("Error fetching Price page :", error);
  }
};

exports.getuserapplied = async (req, res, next) => {
  try {
const applications = await Application.findAll({
  where: { applicantId: req.session.xid },
  include: [
    {
      model: Job,
      include: [
        {
          model: Company,
          attributes: ["name", "logo"],
        },
      ],
    },
    {
      model: Applicant,
    },
  ],
});
    res.render("userapplied", { applications: applications });
  } catch (error) {
    console.error("Error fetching User applied page :", error);
  }
};

exports.getUserchangepass = async (req, res, next) => {
  try {
    res.render("userchangepass");
  } catch (error) {
    console.error("Error fetching User change pass page :", error);
  }
};

exports.getUserdeleteprofile = async (req, res, next) => {
  try {
    res.render("userdeleteprofile");
  } catch (error) {
    console.error("Error fetching User delete profile page :", error);
  }
};

exports.getUserprofile = async (req, res, next) => {
  try {
    res.render("userprofile");
  } catch (error) {
    console.error("Error fetching User profile page :", error);
  }
};

exports.getUsersettings = async (req, res, next) => {
  try {
    res.render("usersetting");
  } catch (error) {
    console.error("Error fetching User settings page :", error);
  }
};

exports.getJobgridedit = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      where: { status: "Available" },
      include: [
        {
          model: Company,
          attributes: ["name", "logo"],
        },
      ],
    });

    res.render("jobgridedit", { jobs: jobs });
  } catch (error) {
    console.error("Error fetching Job grid edit page :", error);
  }
};

exports.postApplyToJob = async (req, res, next) => {
  try {
    const cover_letter = req.body.cover_letter;
    const jobId = req.body.jobId;
    const cv = req.file;

    const application = await Application.create({
      cover_letter: cover_letter,
      cv_path: cv.filename,
      jobId: jobId,
      applicantId: req.session.xid,
    });

    res.redirect("/userapplied");
  } catch (error) {
    console.error("Error fetching Job grid edit page :", error);
  }
};

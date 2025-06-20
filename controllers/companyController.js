const Job = require("../models/job");
const Application = require("../models/application");
const sequelize = require("../util/database");
const { Op, fn, col } = require("sequelize");
const Applicant = require("../models/applicant");
const Company = require("../models/company");
const User = require("../models/user");

const bcrypt = require("bcrypt");


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

exports.getCompanyjobsview = async (req, res, next) => {
  try {
    // Get all applications for this job
    const applications = await Application.findAll({
      where: { jobId: req.params.jobId },
      include: [
        {
          model: Job,
          attributes: [
            "title",
            "type",
            "application_deadline",
            "createdAt",
            "salary_period",
            "min_salary",
            "max_salary",
          ],
        },
        {
          model: Applicant,
          attributes: ["name", "phone", "image"],
        },
      ],
    });

    // Count applications for this job
    const applicantsCount = await Application.count({
      where: { jobId: req.params.jobId },
    });

    const company = await Company.findByPk(req.session.xid);

    res.render("companyjobsview", {
      applications,
      applicantsCount,
      company: company,
    });
  } catch (error) {
    console.error("Error fetching Company jobs view page :", error);
  }
};

exports.getCompanychangepass = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });

    res.render("companychangepass", { company: company });
  } catch (error) {
    console.error("Error fetching Company change pass page :", error);
  }
};

exports.getCompanydeleteprofile = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.session.xid);

    res.render("companydeleteprofile", { company: company });
  } catch (error) {
    console.error("Error fetching Company delete profile page :", error);
  }
};

exports.getCompanysubmitjob = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.session.xid);

    res.render("companysubmitjob", {
      companyId: req.session.user.id || null,
      company: company,
    });
  } catch (error) {
    console.error("Error fetching Company submit job page :", error);
  }
};

exports.getCompanyprofile = async (req, res, next) => {
  try {
    const companyId = req.session.xid;
    const company = await Company.findByPk(companyId);
    const jobs = await Job.findAll({ where: { companyId: companyId } });

    if (!company) return res.status(404).send("Company not found");
    res.render("companyprofile", { company: company, jobs: jobs });
  } catch (error) {
    console.error("Error fetching Company profile page :", error);
  }
};

exports.getEditProfile = async (req, res) => {
  try {
    const companyId = req.session.xid;
    const company = await Company.findByPk(companyId, {
      include: [
        {
          model: User,
          as: "user", // use the alias if you defined one in your association
        },
      ],
    });
    if (!company) return res.status(404).send("Company not found");

    res.render("companyprofilesett", { company: company });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// POST: Update Profile
exports.postEditProfile = async (req, res) => {
  try {
    const companyId = req.session.xid;

    const { name, address, website, categories, description } = req.body;

    const uploadedFiles = req.files || {};

    const logoFile = uploadedFiles.companyLogo
      ? uploadedFiles.companyLogo[0]
      : null;

    const updatedData = {
      name,
      address,
      website,
      categories,
      description,
      updatedAt: new Date(),
    };

    if (logoFile) updatedData.logo = logoFile.filename;

    await Company.update(updatedData, {
      where: { id: companyId },
    });

    res.redirect("/companyprofile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Update failed");
  }
};

exports.getCompanyjobs = async (req, res, next) => {
  try {
    const jobsCount = await Job.count({
      where: { companyId: req.session.xid },
    });

    // Get all jobs for this company
    const jobs = await Job.findAll({
      where: { companyId: req.session.xid },
      include: [
        {
          model: Application,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM applications AS application
              WHERE
                application.jobId = job.id
            )`),
            "applicantsCount",
          ],
        ],
      },
    });

    // Get all applications for this company's jobs
    const allApplications = await Application.findAll({
      include: [
        {
          model: Job,
          where: { companyId: req.session.xid },
          attributes: [],
        },
      ],
      attributes: ["status"],
    });

    // Count by status
    let pendingCount = 0,
      approvedCount = 0,
      rejectedCount = 0;
    allApplications.forEach((app) => {
      if (app.status === "Pending") pendingCount++;
      else if (app.status === "Approved") approvedCount++;
      else if (app.status === "Rejected") rejectedCount++;
    });

    // Calculate total applicants across all jobs
    const totalApplicants = jobs.reduce((sum, job) => {
      return sum + Number(job.getDataValue("applicantsCount") || 0);
    }, 0);

    const company = await Company.findByPk(req.session.xid);

    res.render("companyjobs", {
      jobs,
      totalApplicants,
      jobsCount,
      pendingCount,
      approvedCount,
      rejectedCount,
      company: company,
    });
  } catch (error) {
    console.error("Error fetching Company jobs page :", error);
  }
};

exports.getCompanyeditjobs = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.session.xid);

    res.render("companyeditjob", { company: company });
  } catch (error) {
    console.error("Error fetching Company edit jobs page :", error);
  }
};

exports.postCompanysubmitjob = async (req, res, next) => {
  try {
    var title = req.body.title;
    var jobType = req.body.jobType;
    var deadline = req.body.deadline;
    var salaryType = req.body.salaryType;
    var minSalary = req.body.minSalary;
    var maxSalary = req.body.maxSalary;
    var description = req.body.description;
    var companyId = req.session.xid;

    const job = await Job.create({
      title: title,
      type: jobType,
      application_deadline: deadline,
      salary_period: salaryType,
      min_salary: minSalary,
      max_salary: maxSalary,
      description: description,
      companyId: companyId,
      status: "available",
    });

    res.redirect("/companyjobs");
  } catch (error) {
    console.error("Error fetching Company submit job page :", error);
  }
};

exports.postCompanychangepass = async (req, res) => {
  try {
    const xcompany = await Company.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });

    const userId = req.session.user.id;
    const { oldPassword, newPassword } = req.body;

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).render("companychangepass", {
        error: "Old Password is incorrect",
        company: xcompany,
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.redirect("/userprofile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Update failed");
  }
};
exports.postCompanydeleteprofile = async (req, res) => {
  try {
    const xcompany = await Company.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });

    const userId = req.session.user.id;
    const { password } = req.body;

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("companydeleteprofile", {
        error: "Password is incorrect",
        company: xcompany,
      });
    }

    // Update password
    await User.destroy({ where: { id: userId } });

    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/home");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Update failed");
  }
};
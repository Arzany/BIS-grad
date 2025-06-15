const Job = require("../models/job");
const Company = require("../models/company");
const Application = require("../models/application");
const Applicant = require("../models/applicant");
const User = require("../models/user");

const bcrypt = require("bcrypt");

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

    let errorMessage;
    if (req.query.error === "already_applied") {
      errorMessage = "You have already applied to this job.";
    }

    console.log("______________________");
    console.log("______________________");
    console.log(errorMessage);
    res.render("jobdetailedit", { job: job, error: errorMessage });
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

    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });
    res.render("userapplied", {
      applications: applications,
      applicant: applicant,
    });
  } catch (error) {
    console.error("Error fetching User applied page :", error);
  }
};

exports.getUserchangepass = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });
    res.render("userchangepass", { applicant: applicant });
  } catch (error) {
    console.error("Error fetching User change pass page :", error);
  }
};

exports.getUserdeleteprofile = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });
    res.render("userdeleteprofile", { applicant: applicant });
  } catch (error) {
    console.error("Error fetching User delete profile page :", error);
  }
};

exports.getUserprofile = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });
    res.render("userprofile", { applicant: applicant });
  } catch (error) {
    console.error("Error fetching User profile page :", error);
  }
};

exports.getUsersettings = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });
    res.render("usersetting", { applicant: applicant });
  } catch (error) {
    console.error("Error fetching User settings page :", error);
  }
};

exports.getEditProfile = async (req, res) => {
  try {
    const appliantId = req.session.xid;
    const user = await user.findByPk(appliantId, {
      include: [
        {
          model: User,
          as: "user", // use the alias if you defined one in your association
        },
      ],
    });
    if (!applicant) return res.status(404).send("applicant not found");

    res.render("usersetting", { applicant });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// POST: Update Profile
exports.postEditProfile = async (req, res) => {
  try {
    const applicantId = req.session.xid;

    const {
      name,
      address,
      phone,
      gender,
      age,
      disability_type,
      major,
      language,
      education,
      my_experience,
    } = req.body;

    // Handle files from multer.fields()
    const uploadedFiles = req.files || {};

    const cvFile = uploadedFiles.cv ? uploadedFiles.cv[0] : null;
    const imageFile = uploadedFiles.applicantImage
      ? uploadedFiles.applicantImage[0]
      : null;

    const updatedData = {
      name,
      address,
      phone,
      gender,
      age,
      disability_type,
      major,
      language,
      education,
      my_experience,
      updatedAt: new Date(),
    };

    if (cvFile) updatedData.cv = cvFile.filename;
    if (imageFile) updatedData.image = imageFile.filename;

    await Applicant.update(updatedData, {
      where: { id: applicantId },
    });

    res.redirect("/userprofile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Update failed");
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

    const applicant = await Applicant.findByPk(req.session.xid, {
      include: [{ model: User, as: "user" }],
    });

    res.render("jobgridedit", { jobs: jobs, applicant: applicant });
  } catch (error) {
    console.error("Error fetching Job grid edit page :", error);
  }
};

exports.postApplyToJob = async (req, res, next) => {
  try {
    const cover_letter = req.body.cover_letter;
    const jobId = req.body.jobId;

    const existingApplication = await Application.findOne({
      where: {
        applicantId: req.session.xid,
        jobId: jobId,
      },
    });

    if (existingApplication) {
      // Application already exists, handle accordingly:
      // e.g. send error response, or update existing record
      return res.redirect(`/jobdetailedit/${jobId}?error=already_applied`);
    }

    const uploadedFiles = req.files || {};

    const cvFile = uploadedFiles.cv ? uploadedFiles.cv[0] : null;
    var cv;
    if (cvFile) {
      cv = cvFile.filename;
    }

    const application = await Application.create({
      cover_letter: cover_letter,
      cv_path: cv,
      jobId: jobId,
      applicantId: req.session.xid,
    });

    res.redirect("/userapplied");
  } catch (error) {
    console.error("Error fetching Job grid edit page :", error);
  }
};

exports.postUserchangepass = async (req, res) => {
  try {
    const xapplicant = await Applicant.findByPk(req.session.xid, {
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
      return res.status(400).render("userchangepass", {
        error: "Old Password is incorrect",
        applicant: xapplicant,
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
exports.postUserdeleteprofile = async (req, res) => {
  try {
    const xapplicant = await Applicant.findByPk(req.session.xid, {
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
      return res.status(400).render("userdeleteprofile", {
        error: "Password is incorrect",
        applicant: xapplicant,
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

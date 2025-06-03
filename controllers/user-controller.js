exports.getJobdetailedit = async (req, res, next) => {
  try {
    res.render("Jobdetailedit");
  } catch (error) {
    console.error("Error fetching Job detail edit page :", error);
  }
};



exports.getPayment = async (req, res, next) => {
  try {
    res.render("Payment");
  } catch (error) {
    console.error("Error fetching Payment page :", error);
  }
};



exports.getPrice = async (req, res, next) => {
  try {
    res.render("Price");
  } catch (error) {
    console.error("Error fetching Price page :", error);
  }
};



exports.getUserapplied = async (req, res, next) => {
  try {
    res.render("User applied");
  } catch (error) {
    console.error("Error fetching User appliedpage :", error);
  }
};



exports.getUserchangepass = async (req, res, next) => {
  try {
    res.render("User change pass");
  } catch (error) {
    console.error("Error fetching User change pass page :", error);
  }
};



exports.getUserdeleteprofile = async (req, res, next) => {
  try {
    res.render("User delete profile");
  } catch (error) {
    console.error("Error fetching User delete profile page :", error);
  }
};



exports.getUserprofile = async (req, res, next) => {
  try {
    res.render("User profile");
  } catch (error) {
    console.error("Error fetching User profile page :", error);
  }
};



exports.getUsersettings = async (req, res, next) => {
  try {
    res.render("User settings");
  } catch (error) {
    console.error("Error fetching User settings page :", error);
  }
};


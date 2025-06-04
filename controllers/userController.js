exports.getJobdetailedit = async (req, res, next) => {
  try {
    res.render("jobdetailedit");
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



exports.getUserapplied = async (req, res, next) => {
  try {
    res.render("userapplied");
  } catch (error) {
    console.error("Error fetching User appliedpage :", error);
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


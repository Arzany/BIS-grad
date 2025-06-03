exports.getJobgridedit = async (req, res, next) => {
  try {
    res.render("Jobgridedit");
  } catch (error) {
    console.error("Error fetching Job grid edit page :", error);
  }
};



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
    res.render("Admindashboard");
  } catch (error) {
    console.error("Error fetching Admin dashboard page :", error);
  }
};

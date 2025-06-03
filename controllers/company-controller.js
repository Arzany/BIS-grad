
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




exports.getCompanyjobsview = async (req, res, next) => {
  try {
    res.render("Company jobs view");
  } catch (error) {
    console.error("Error fetching Company jobs view page :", error);
  }
};



exports.getComapnychangepass = async (req, res, next) => {
  try {
    res.render("Comapny change pass");
  } catch (error) {
    console.error("Error fetching Comapny change pass page :", error);
  }
};





exports.getCompanydeleteprofile = async (req, res, next) => {
  try {
    res.render("Company delete profile");
  } catch (error) {
    console.error("Error fetching Company delete profile page :", error);
  }
};



exports.getCompanysubmitjob = async (req, res, next) => {
  try {
    res.render("Company submit job");
  } catch (error) {
    console.error("Error fetching Company submit job page :", error);
  }
};



exports.getComapnyprofile = async (req, res, next) => {
  try {
    res.render("Comapny profile");
  } catch (error) {
    console.error("Error fetching Comapny profile page :", error);
  }
};





exports.getComapnyprofilesett = async (req, res, next) => {
  try {
    res.render("Comapny profile sett");
  } catch (error) {
    console.error("Error fetching Comapny profile sett page :", error);
  }
};





exports.getComapnyjobs = async (req, res, next) => {
  try {
    res.render("Comapny jobs");
  } catch (error) {
    console.error("Error fetching Comapny jobs page :", error);
  }
};






exports.getComapnyeditjobs = async (req, res, next) => {
  try {
    res.render("Comapny edit jobs");
  } catch (error) {
    console.error("Error fetching Comapny edit jobs page :", error);
  }
};

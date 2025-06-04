
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
    res.render("companyjobsview");
  } catch (error) {
    console.error("Error fetching Company jobs view page :", error);
  }
};



exports.getComapnychangepass = async (req, res, next) => {
  try {
    res.render("companychangepass");
  } catch (error) {
    console.error("Error fetching Comapny change pass page :", error);
  }
};





exports.getCompanydeleteprofile = async (req, res, next) => {
  try {
    res.render("companydeleteprofile");
  } catch (error) {
    console.error("Error fetching Company delete profile page :", error);
  }
};



exports.getCompanysubmitjob = async (req, res, next) => {
  try {
    res.render("companysubmitjob");
  } catch (error) {
    console.error("Error fetching Company submit job page :", error);
  }
};



exports.getComapnyprofile = async (req, res, next) => {
  try {
    res.render("companyprofile");
  } catch (error) {
    console.error("Error fetching Comapny profile page :", error);
  }
};





exports.getComapnyprofilesett = async (req, res, next) => {
  try {
    res.render("companyprofilesett");
  } catch (error) {
    console.error("Error fetching Comapny profile sett page :", error);
  }
};





exports.getComapnyjobs = async (req, res, next) => {
  try {
    res.render("companyjobs");
  } catch (error) {
    console.error("Error fetching Comapny jobs page :", error);
  }
};






exports.getComapnyeditjobs = async (req, res, next) => {
  try {
    res.render("companyeditjob");
  } catch (error) {
    console.error("Error fetching Comapny edit jobs page :", error);
  }
};

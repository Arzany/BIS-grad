
exports.getFeedback = async (req, res, next) => {
  try {
    res.render("feedback");
  } catch (error) {
    console.error("Error fetching feedback page :", error);
  }
};


exports.getFinalhome = async (req, res, next) => {
  try {
    res.render("final home");
  } catch (error) {
    console.error("Error fetching final home page :", error);
  }
};


exports.getLogin = async (req, res, next) => {
  try {
    res.render("Login");
  } catch (error) {
    console.error("Error fetching Login page :", error);
  }
};


exports.getRegister = async (req, res, next) => {
  try {
    res.render("Register");
  } catch (error) {
    console.error("Error fetching Register page :", error);
  }
};

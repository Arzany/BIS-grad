
exports.getFeedback = async (req, res, next) => {
  try {
    res.render("feedback");
  } catch (error) {
    console.error("Error fetching feedback page :", error);
  }
};


exports.getFinalhome = async (req, res, next) => {
  try {
    res.render("home");
  } catch (error) {
    console.error("Error fetching final home page :", error);
  }
};


exports.getLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error fetching Login page :", error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    // check user
  } catch (error) {
    console.error("Error fetching Login page :", error);
  }
};

exports.getRegister = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    console.error("Error fetching Register page :", error);
  }
};

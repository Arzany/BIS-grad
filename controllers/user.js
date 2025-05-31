const ejs = require("ejs"); // Add this line to require ejs
exports.getIndex = async (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Error fetching index page :", error);
  }
};
const express = require("express");
const commonController = require("../controllers/commonController");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------


//gets
router.get("/home", commonController.getFinalhome);
router.get("/feedback", commonController.getFeedback);
router.get("/login", commonController.getLogin);
router.get("/register", commonController.getRegister);









//posts
router.post("/login", commonController.postLogin);
// router.post("/:companyName/signin", userController.postSignin);

module.exports = router;

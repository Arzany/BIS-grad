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
router.get("/awareness",commonController.getawareness);

//posts
router.post("/register", commonController.postRegister);
router.post("/login", commonController.postLogin);
router.post("/logout", commonController.postLogout);
router.post("/feedback", commonController.postFeedback);


module.exports = router;

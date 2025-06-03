const express = require("express");
const commenController = require("../controllers/Commen-controller");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------


//gets
router.get("/", commenController.getFinalhome);
router.get("/feedback", commenController.getFeedback);
router.get("/login", commenController.getLogin);
router.get("/register", commenController.getRegister);









//posts
router.post("/login", commenController.postLogin);
// router.post("/:companyName/signin", userController.postSignin);

module.exports = router;

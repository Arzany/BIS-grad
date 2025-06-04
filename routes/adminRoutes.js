const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------

//gets
router.get("/admindashboard" , adminController.getAdmindashboard);
router.get("/jogbgridedit" , adminController.getJobgridedit);
router.get("/companylist",adminController.getCompanylist);
router.get("/userlist",adminController.getUserlist);





//posts
// router.post("/:companyName/signin", userController.postSignin);

module.exports = router;

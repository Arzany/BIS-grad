const express = require("express");
const usercontroller = require("../controllers/userController");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------


//gets
router.get("/jobgridedit" , usercontroller.getJobgridedit);
router.get("/jobdetailedit/:jobId", usercontroller.getJobdetailedit);
router.get("/payment", usercontroller.getPayment);
router.get("/price",usercontroller.getPrice);
router.get("/userapplied", usercontroller.getuserapplied);
router.get("/userchangepass", usercontroller.getUserchangepass);
router.get("/userdeleteprofile", usercontroller.getUserdeleteprofile);
router.get("/userprofile",usercontroller.getUserprofile);
router.get("/usersetting",usercontroller.getUsersettings);


router.post("/applyToJob",usercontroller.postApplyToJob);
router.post("/companyprofilesett",usercontroller.postEditProfile);


module.exports = router;


const express = require("express");
const usercontroller = require("../controllers/userController");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------


//gets
router.get("/jobdetail", usercontroller.getJobdetailedit);
router.get("/payment", usercontroller.getPayment);
router.get("/getprice",usercontroller.getPrice);
router.get("/userapplied", usercontroller.getUserapplied);
router.get("/userchangepass", usercontroller.getUserchangepass);
router.get("/userdeleteprofile", usercontroller.getUserdeleteprofile);
router.get("/userprofile",usercontroller.getUserprofile);
router.get("/usersettings",usercontroller.getUsersettings);



module.exports = router;



//posts
const express = require("express");
const companycontroller = require("../controllers/companyController");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------


//gets
router.get("/companyjobsview",companycontroller.getCompanyjobsview);
router.get("/payment",companycontroller.getPayment);
router.get("/price",companycontroller.getPrice);
router.get("/companychangepass",companycontroller.getComapnychangepass);
router.get("/companydeleteprofile",companycontroller.getCompanydeleteprofile);
router.get("/companysubmitjob",companycontroller.getCompanysubmitjob);
router.get("/companyprofile",companycontroller.getComapnyprofile);
router.get("/companyprofilesett",companycontroller.getComapnyprofilesett);
router.get("/companyjobs",companycontroller.getComapnyjobs);
router.get("/companyeditjob",companycontroller.getComapnyeditjobs);




module.exports = router;

//posts

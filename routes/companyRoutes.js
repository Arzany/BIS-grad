const express = require("express");
const companycontroller = require("../controllers/companyController");
const upload = require("../middlewares/fileUpload");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------

//gets
router.get("/companyjobsview/:jobId", companycontroller.getCompanyjobsview);
router.get("/payment", companycontroller.getPayment);
router.get("/price", companycontroller.getPrice);
router.get("/companychangepass", companycontroller.getCompanychangepass);
router.get("/companydeleteprofile", companycontroller.getCompanydeleteprofile);
router.get("/companysubmitjob", companycontroller.getCompanysubmitjob);
router.get("/companyprofile", companycontroller.getCompanyprofile);
router.get("/companyprofilesett", companycontroller.getEditProfile);
router.get("/companyjobs", companycontroller.getCompanyjobs);
router.get("/companyeditjob", companycontroller.getCompanyeditjobs);

router.post("/companysubmitjob", companycontroller.postCompanysubmitjob);
router.post("/companyprofilesett", upload, companycontroller.postEditProfile);
router.post("/companychangepass", companycontroller.postCompanychangepass);
router.post("/companydeleteprofile", companycontroller.postCompanydeleteprofile);


module.exports = router;

//posts

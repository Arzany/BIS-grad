const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// -------------------
// Sign In / Sign Out
// -------------------
router.get("/", userController.getIndex);
// router.post("/:companyName/signin", userController.postSignin);

module.exports = router;

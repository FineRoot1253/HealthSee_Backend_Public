var express = require("express");
var router = express.Router();
const loginUser = require("../../lib/sequelize/account/loginUser");
const sendToken = require("../../lib/sequelize/account/sendToken");
const createAccount = require("../../lib/sequelize/account/createAccount");
const logoutUser = require("../../lib/sequelize/account/userManagement");
const checkUser = require("../../lib/check/user").checkUser;

router.post("/login", loginUser, sendToken);
router.post("/register", createAccount, sendToken);
router.post("/logout", logoutUser);

router.get("/check", checkUser);

module.exports = router;

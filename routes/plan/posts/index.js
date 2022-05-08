var express = require("express");
var router = express.Router();
const writePost = require("../../../lib/sequelize/plan/writePlan").writePlan;
const readPost = require("../../../lib/sequelize/plan/readPlan").readPlan;
const deletePost = require("../../../lib/sequelize/plan/deletePlan").deletePlan;
const checkLogin = require("../../../lib/check/user").checkLogin;
const checkPlan = require("../../../lib/check/plan").checkPlan;
const reportPost = require("../../../lib/sequelize/plan/reportPlan");
const pushHealthsee = require("../../../lib/sequelize/plan/pushPlanHealthsee");
const updatePost = require("../../../lib/sequelize/plan/updatePlan").updatePlan;

// 작성
router.post("/", checkLogin, writePost, readPost);

router.get("/:PL_Code", readPost);

router.delete("/:PL_Code", checkPlan, checkLogin, deletePost);

router.patch(
  "/:PL_Code",
  checkPlan,
  updatePost,
  readPost
);
// 신고
router.post("/report", checkPlan, checkLogin, reportPost);

// 추천
router.post("/healthsee", checkPlan, checkLogin, pushHealthsee);

module.exports = router;
var express = require("express");
var router = express.Router();
const writeEvaluation = require("../../../lib/sequelize/plan/writePlan")
  .writeEvaluation;
const readEvaluation = require("../../../lib/sequelize/plan/readPlan")
  .readEvaluation;
const checkLogin = require("../../../lib/check/user").checkLogin;
const checkEvaluation = require("../../../lib/check/plan").checkEvaluation;
const deleteEvaluation = require("../../../lib/sequelize/plan/deletePlan")
  .deleteEvaluation;
const updateEvaluation = require("../../../lib/sequelize/plan/updatePlan")
  .updateEvaluation;
const reportEvaluation = require("../../../lib/sequelize/plan/reportPlanEvaluation");
const  checkPlan  = require("../../../lib/check/plan").checkPlan;
// 댓글 작성
router.post("/", checkPlan, writeEvaluation, readEvaluation);

router.post("/report/:PL_Code",checkPlan, checkEvaluation, reportEvaluation, readEvaluation);

// 해당 BO_CODE의 댓글 조회
router.get("/:PL_Code&:page", readEvaluation);

router.patch(
  "/:PL_Code",
  checkPlan,
  checkEvaluation,
  checkLogin,
  updateEvaluation,
  readEvaluation
);

//router.delete("/:BC_Code",deleteComment, readComment);
router.delete(
  "/:PL_Code&:PEV_Code&:page",
  checkPlan,
  checkEvaluation,
  checkLogin,
  deleteEvaluation,
  readEvaluation
);

module.exports = router;

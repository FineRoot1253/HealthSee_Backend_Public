const PlanDetail = require("../../../models").plandetail;
const P_Evaluation = require("../../../models").p_evaluation;
const Plan = require("../../../models").plan;

const checkPlan = async (req, res, next) => {
  const PL_Code = req.params.PL_Code ? req.params.PL_Code : 
                  req.body.Plan_PL_Code ? req.body.Plan_PL_Code : req.body.PL_Code;

  if (!PL_Code) {
    res.status(400).end();
    return;
  }
  console.log(PL_Code);

  try {
    const plan = await PlanDetail.findOne({ where: { PL_Code: PL_Code } });

    if (!plan) {
      res.status(404).end();
      return;
    }
    console.log(plan);

    req.body.writerNickName = plan.PL_Writer_NickName;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

const checkEvaluation = async (req, res, next) => {
  let PEV_Code;

  if (req.method === "PATCH" || req.method === "POST")
  PEV_Code = req.body.PEV_Code;
  else PEV_Code = req.params.PEV_Code;

  console.log(PEV_Code);

  if (!PEV_Code) {
    res.status(400).end();
    return;
  }

  try {
    const evaluation = await P_Evaluation.findOne({ where: { PEV_Code } });

    if (!evaluation) {
      res.status(404).end();
      return;
    }

    req.body.writerNickName = evaluation.PEV_Writer_NickName;
    next();
  } catch (error) {
    res.status(500).end();
  }
};


// Plan Code가 존재하는지 확인
const checkOwnPlan = async (req, res, next) => {
  const { planCode } = req.body.training;

  console.log("asdsadsad", planCode);

  if (!planCode) {
    next();
  }

  try {
    let plan = await Plan.findOne({
      where: { PL_Code: planCode },
    });

    if (!plan) {
      res.status(404).end();
      return;
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

module.exports = {checkOwnPlan, checkPlan, checkEvaluation };

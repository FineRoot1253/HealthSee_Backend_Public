const Plan = require("../../../models").plan;
const P_Evaluation = require("../../../models").p_evaluation;
var today = require("../../Date/time");


const writePlan = async (req, res, next) =>{

  let {
    PL_Title,
    PL_RestTIme,
    PL_Description,
    PL_Routin,
    PL_Scope
  } = req.body;
  console.log(req.body.PL_Routin);

  let plan = await Plan.create({
    PL_Writer_NickName : req.body.user.username,
    PL_Title,
    PL_RestTIme,
    PL_Description,
    PL_Creation_Date : today,
    PL_Routin,
    PL_Scope
  });
  //'2020-09-18 12:00:00'

  req.params.PL_Code = plan.PL_Code;
  req.body.username = req.body.user.username,
  req.body.self = true;
  next();
  // res.end();
}

const writeEvaluation = async (req, res, next) => {
  let PEV_Content = req.body.PEV_Content;
  let Plan_PL_Code = req.body.Plan_PL_Code;
  let PEV_Writer_NickName = req.body.user.username;
  let PEV_Creation_Date = today;
  



  await P_Evaluation.create({
    PEV_Content,
    Plan_PL_Code,
    PEV_Writer_NickName,
    PEV_Creation_Date,
  });

  
  req.params.PL_Code = Plan_PL_Code;
  req.params.page = req.body.page ? req.body.page : 1;
  next();
};

module.exports = { writePlan, writeEvaluation };


const P_Evaluation = require("../../../models").p_evaluation;
const Plan = require("../../../models").plan;
var today = require("../../Date/time");


const updatePlan = async (req, res, next) => {
  console.log(req.body);
  let PL_Code = req.params.PL_Code;
 
  let PL_Title = req.body.PL_Title;
  let PL_Description = req.body.PL_Description;
  let PL_Writer_NickName = req.body.username;
  let PL_Routin = req.body.PL_Routin;

  let PL_Creation_Date = today;
  
  const plan = await Plan.update(
    {
      PL_Code,
      PL_Title,
      PL_Description,
      PL_Writer_NickName,
      PL_Creation_Date,
      PL_Routin,
    },
    { where: { PL_Code } }
  );



  req.body.self = true;
  next();
};

const updateEvaluation = async (req, res, next) => {
  var PEV_Code = req.body.PEV_Code;
  var PEV_Content = req.body.PEV_Content;

  var evaluation = await P_Evaluation.findOne({
    where: { PEV_Code },
  });
  req.params.PL_Code = evaluation.Plan_PL_Code;

  await P_Evaluation.update({ PEV_Content }, { where: { PEV_Code: PEV_Code } });
  req.params.page = req.body.page;
  console.log("asdasd", req.body.page);
  next();
};

module.exports = { updatePlan, updateEvaluation };
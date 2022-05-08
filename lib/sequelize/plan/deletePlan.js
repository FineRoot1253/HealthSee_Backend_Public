const P_Evaluation = require("../../../models").p_evaluation;
const Plan = require("../../../models").plan;

const deleteEvaluation = async (req, res, next) => {
  var PEV_Code = req.params.PEV_Code;
  console.log("asdfasdfasdfasdf");
  var evaluation = await P_Evaluation.findOne({
    where: { PEV_Code },
  });

  req.params.PL_Code = evaluation.Plan_PL_Code;
  console.log(req.params.PL_Code);
  await P_Evaluation.update({PEV_State : 2},{where : {PEV_Code}})
    .catch((err) => {
      console.error(err);
      res.status(401).end();
    });
    next();
};

const deletePlan = async (req, res) => {
  console.log(req.params);
  var PL_Code = req.params.PL_Code;
  console.log(PL_Code,'asdfasdf');
  await Plan.destroy({ where: { PL_Code } })
    .then(() => {
      res.json({ result: 1 });
    })
    .catch((err) => {
      console.error(err);
    });
    return res.end();
};

module.exports = { deleteEvaluation, deletePlan };

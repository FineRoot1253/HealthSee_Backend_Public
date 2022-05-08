const P_Evaluation_View = require("../../../models").p_evaluation_view;
const PlanDetail = require("../../../models").plandetail;
const { Op } = require("sequelize");
const P_Healthsee = require("../../../models").p_healthsee;
const P_Reporter= require("../../../models").p_reporter;

const readPlan = async (req, res, next) => {
  var PL_Code = req.params.PL_Code;

  var responseData = {};

  var plan = await PlanDetail.findOne({
    where: { PL_Code },
  });
  if (plan.PL_Scope === 2) return res.status(406).end();

  // 댓글 1페이지
  evaluations = await P_Evaluation_View.findAndCountAll({
    where: { Plan_PL_Code: PL_Code },
    order: [
      ["PEV_Code", "DESC"],
    ],
  });

  
  if(req.method === 'GET')
    username = req.body.user.username;
  else
    username = req.body.username;

    console.log(username);

    let isHealthsee = await P_Healthsee.count({
      where: {
        [Op.and]: [{ Plan_PL_Code: PL_Code }, { PHE_Push_NickName: username }],
      },
    });
    let isReport = await P_Reporter.count({
      where: {
        [Op.and]: [
          { Plan_PL_Code: PL_Code },
          { PRE_Reporter_NickName: username },
        ],
      },
    });
 
   responseData.planDetail = plan;
   responseData.lastPage =
    Math.ceil(evaluations.count / 20) == 0 ? 1 : Math.ceil(evaluations.count / 20);
    console.log(responseData.lastPage);
    console.log(responseData.picture);
    responseData.isHealthsee = isHealthsee;
    responseData.isReport = isReport;
   responseData.evaluations = evaluations.rows;
   responseData.evaluationsCount = evaluations.count;

  return res.json(responseData);
};


const readEvaluation = async (req, res, next) => {
  var PL_Code = req.params.PL_Code;
  var offset = 0;
  var page = req.params.page;

  if(page > 1)
    offset = (page - 1) * 20;
  else if (page < 1)
    {
      // 에러 발생
    }

  var responseData = {};
  evaluations = await P_Evaluation_View.findAndCountAll({
    where: { Plan_PL_Code: PL_Code },
    order: [
      ["PEV_Code", "DESC"],
    ],
    limit : 20, offset: offset
  });
  responseData.evaluations = evaluations.rows;
  responseData.evaluationsCount = evaluations.count;
  responseData.lastPage = Math.ceil(evaluations.count / 20);
  res.json(responseData);
};



module.exports = { readPlan, readEvaluation};
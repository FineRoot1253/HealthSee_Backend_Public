const P_Reporter = require("../../../models").p_reporter;
const PlanList = require("../../../models").planlist;
const Plan = require("../../../models").plan;
let today = require("../../Date/time");
const { Op } = require("sequelize");

const reportPlan = async (req, res) => {
  let Plan_PL_Code = req.body.PL_Code;
  let PRE_Reporter_NickName = req.body.user.username;
  let response = {};
  let planList;
  await P_Reporter.findOrCreate({
    where : {[Op.and]: [
        {PRE_Reporter_NickName},
        {Plan_PL_Code}
    ]},
    defaults : {Plan_PL_Code,PRE_Reporter_NickName,PRE_Creation : today}})
    .spread( async function (report, created) {
      // 새로 생성이 된 경우
        if(created){
          response.isReport = true;
        }// 이미 존재하는 경우
        else{
          await P_Reporter.destroy({
            where: {
                Plan_PL_Code,
                PRE_Reporter_NickName,
            },
          });
          response.isReport = false;
        }
    });
    planList = await PlanList.findOne({
      where: { PL_Code: Plan_PL_Code }
    });
    // 신고 수로 인한 블라인드 처리
    if(planList.P_Report_Count > 0){
      await Plan.update({PL_Scope:2},{where:{PL_Code : Plan_PL_Code}});
      res.status(406).end();
     }
    response.P_Report_Count = planList.P_Report_Count;
    res.json(response);
};

module.exports = reportPlan;
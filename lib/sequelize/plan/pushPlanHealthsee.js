const P_Healthsee = require("../../../models").p_healthsee;
const Planlist = require("../../../models").planlist;
var today = require("../../Date/time");
const { Op } = require("sequelize");

const pushPlanHealthsee = async (req, res) => {
  let Plan_PL_Code = req.body.PL_Code;
  let PHE_Push_NickName = req.body.user.username;
  let response = {};
  let planList;
  await P_Healthsee.findOrCreate({
    where : {[Op.and]: [
        {PHE_Push_NickName},
        {Plan_PL_Code}
    ]},
    defaults : {Plan_PL_Code,PHE_Push_NickName,PHE_Creation : today}})
    .spread( async function (report, created) {
      // 새로 생성이 된 경우
        if(created){
          response.isHealthsee = true;
        }// 이미 존재하는 경우
        else{
          await B_Healthsee.destroy({
            where: {
             Board_BO_Code,
             BH_Push_NickName,
            },
          });
          response.isHealthsee = false;
        }
    });
    planList = await Planlist.findOne({
      where: { PL_Code: Plan_PL_Code }
    });

    response.P_Healthsee_Count = planList.P_Healthsee_Count;
    res.json(response);

};

module.exports = pushPlanHealthsee;

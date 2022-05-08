const B_Healthsee = require("../../../models").b_healthsee;
const BoardList = require("../../../models").boardlist;
var today = require("../../Date/time");
const { Op } = require("sequelize");

const pushHealthsee = async (req, res) => {
  let Board_BO_Code = req.body.BO_Code;
  let BH_Push_NickName = req.body.user.username;
  let response = {};
  let boardList;
  await B_Healthsee.findOrCreate({
    where : {[Op.and]: [
        {BH_Push_NickName},
        {Board_BO_Code}
    ]},
    defaults : {Board_BO_Code,BH_Push_NickName,BH_Creation_Date : today}})
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
    boardList = await BoardList.findOne({
      where: { BO_Code: Board_BO_Code }
    });
    // 신고 수로 인한 블라인드 처리
    response.BO_Healthsee_Count = boardList.BO_Healthsee_Count;
    res.json(response);
};
module.exports = pushHealthsee;

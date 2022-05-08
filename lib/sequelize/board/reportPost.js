const B_Reporter = require("../../../models").b_reporter;
const BoardList = require("../../../models").boardlist;
const Board = require("../../../models").board;
let today = require("../../Date/time");
const { Op } = require("sequelize");

const reportPost = async (req, res) => {
  let Board_BO_Code = req.body.BO_Code;
  let BR_Reporter_NickName = req.body.user.username;
  let response = {};
  let boardList;
  await B_Reporter.findOrCreate({
    where : {[Op.and]: [
        {BR_Reporter_NickName},
        {Board_BO_Code}
    ]},
    defaults : {Board_BO_Code,BR_Reporter_NickName,BR_Creation_Date : today}})
    .spread( async function (report, created) {
      // 새로 생성이 된 경우
        if(created){
          response.isReport = true;
        }// 이미 존재하는 경우
        else{
          await B_Reporter.destroy({
            where: {
             Board_BO_Code,
             BR_Reporter_NickName,
            },
          });
          response.isReport = false;
        }
    });
    boardList = await BoardList.findOne({
      where: { BO_Code: Board_BO_Code }
    });
    // 신고 수로 인한 블라인드 처리
    if(boardList.BO_Report_Count > 1){
      await Board.update({BO_State:1},{where:{BO_Code : Board_BO_Code}});
      res.status(406).end();
     }
    response.BO_Report_Count = boardList.BO_Report_Count;
    res.json(response);
};

module.exports = reportPost;



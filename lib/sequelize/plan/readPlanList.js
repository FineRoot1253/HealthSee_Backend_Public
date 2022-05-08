const PlanList = require("../../../models").planlist;
const PlanLogList = require("../../../models").planloglist;
const PlanLog = require("../../../models").p_log;
const { Op } = require("sequelize");

const readList = async (req, res, next) => {
  let name = req.params.name;
  let keyword = req.params.keyword;
  let PL_Code = Number(req.query.PL_Code);
  console.log(PL_Code);
  console.log("commonlist");

  var responseData = {};

  var condition = {};
// if(PL_Code){
//   condition = {
//     where: {
//       [Op.and]: [
//         name && { [name]: { [Op.like]: "%" + keyword + "%" } },
//         PL_Code && {PL_Code: { [Op.lt]: PL_Code } },
//         {PL_Scope : 1},
//       ],
//     },
//     limit: 10,
//   };
// }else{
  condition = {
    where: {
      [Op.and]: [
        name && { [name]: { [Op.like]: "%" + keyword + "%" } },
        PL_Code && {PL_Code: { [Op.lt]: PL_Code } },
        {PL_Scope : 1},
      ],
    },
    limit: 10,
    order: [[`PL_Code`, "DESC"]],
  };



  var planList = await PlanList.findAndCountAll(condition);
  console.log(planList.count);
  console.log(planList);
  responseData.planList = planList.rows;
  responseData.planCount = planList.count;
  return res.json(responseData);
};

const readBestList = async (req, res) =>{
  console.log("best");
    let name = req.params.name;
    let responseData = {};
    let bestList = await PlanList.findAll({
      order: [[`P_Healthsee_Count`, "DESC"]],
      limit: 10,
    });
    console.log(bestList.planlist,"asdfasdfsaasdf");
    responseData.bestPlanList = bestList;
    return res.json(responseData);
};

const readUserLogList = async (req, res, next) =>{
    let name = req.params.name;
    let responseData = {};
    console.log("loguserlist");
    let P_Log = await PlanLog.findAll({
      where: {
        LO_Player_NickName: name
      }
    })
    console.log(P_Log);
    if(P_Log)
      return res.json(responseData);

    let UserLogList = await PlanLogList.findAndCountAll({
        where: {
            LO_Player_NickName: name,
        },
        limit : 4
    });
    console.log(name);
    console.log(UserLogList);
    responseData.planCount = UserLogList.count;
    responseData.UserLogList = UserLogList.rows;
    return res.json(responseData);

};

module.exports = {readList ,readBestList, readUserLogList};
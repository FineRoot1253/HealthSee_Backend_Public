const PE_Reporter = require("../../../models").pe_reporter;
var today = require("../../Date/time");
const P_Evaluation = require("../../../models").p_evaluation;
const { Op } = require("sequelize");



const reportComment = async (req, res, next) => {
    var P_Evaluation_PEV_Code = req.body.P_Evaluation_PEV_Code;
    var P_Evaluation_Plan_PL_Code = req.body.P_Evaluation_Plan_PL_Code;
    var PRE_Reporter_NickName = req.body.user.username;

    await PE_Reporter.findOrCreate({
        where : {[Op.and]: [
            {PRE_Reporter_NickName : PRE_Reporter_NickName},
            {P_Evaluation_PEV_Code : P_Evaluation_PEV_Code}
        ]},
        defaults : {P_Evaluation_PEV_Code,PRE_Reporter_NickName,P_Evaluation_Plan_PL_Code,PRE_Creation : today }})
        .spread( async function (report, created) {
            if(created){
                var pe_reporter = await PE_Reporter.findAndCountAll({
                    where : {P_Evaluation_PEV_Code}
                })
                if(pe_reporter.count > 0){
                    await P_Evaluation.update({PEV_State : 1},{where : {PEV_Code : P_Evaluation_PEV_Code}})
                }
                req.params.PL_Code = P_Evaluation_Plan_PL_Code;
                req.params.page = req.body.page;
                next();
            }else{
                res.status(409).end(); 
            }
        })
  };
  module.exports = reportComment;
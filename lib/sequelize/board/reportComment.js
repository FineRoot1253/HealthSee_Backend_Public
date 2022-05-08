const BC_Reporter = require("../../../models").bc_reporter;
var today = require("../../Date/time");
const B_Comment = require("../../../models").b_comment;
const { Op } = require("sequelize");



const reportComment = async (req, res, next) => {
    var B_Comment_BC_Code = req.body.B_Comment_BC_Code;
    var B_Comment_Board_BO_Code = req.body.Board_BO_Code;
    var BCR_Reporter_NickName = req.body.user.username;

    await BC_Reporter.findOrCreate({
        where : {[Op.and]: [
            {BCR_Reporter_NickName : BCR_Reporter_NickName},
            {B_Comment_BC_Code : B_Comment_BC_Code}
        ]},
        defaults : {B_Comment_BC_Code,BCR_Reporter_NickName,B_Comment_Board_BO_Code,BCR_Creation_Date : today }})
        .spread( async function (report, created) {
            if(created){
                var bc_reporter = await BC_Reporter.findAndCountAll({
                    where : {B_Comment_BC_Code}
                })
                if(bc_reporter.count > 0){
                    await B_Comment.update({BC_State : 1},{where : {BC_Code : B_Comment_BC_Code}})
                }
                req.params.BO_Code = B_Comment_Board_BO_Code;
                req.params.page = req.body.page;
                next();
            }else{
                res.status(409).end(); 
            }
        })
  };
  module.exports = reportComment;
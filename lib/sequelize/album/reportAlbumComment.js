const AC_BlackList = require("../../../models").ac_blacklist;
var today = require("../../Date/time");
const A_Comment = require("../../../models").a_comment;
const { Op } = require("sequelize");



const reportComment = async (req, res, next) => {
    console.log(req.body.user.username);
    var A_Comment_ACO_Code = req.body.A_Comment_ACO_Code;
    var A_Comment_Album_AL_Code = req.body.Album_AL_Code;
    var ACB_Blacklist_NickName = req.body.ACO_Writer_NickName;

    await AC_BlackList.findOrCreate({
        where : {[Op.and]: [
            {ACB_Blacklist_NickName : ACB_Blacklist_NickName},
            {A_Comment_ACO_Code : A_Comment_ACO_Code}
        ]},
        defaults : {A_Comment_ACO_Code, ACB_Blacklist_NickName, A_Comment_Album_AL_Code,ACB_Creation_Date : today }})
        .spread( async function (report, created) {
            if(created){
                var ac_blacklist = await AC_BlackList.findAndCountAll({
                    where : {A_Comment_ACO_Code}
                })
                if(ac_blacklist.count > 0){
                    await A_Comment.update({ACO_State : 1},{where : {ACO_Code : A_Comment_ACO_Code}})
                }
                req.params.AL_Code = A_Comment_Album_AL_Code;
                req.params.page = req.body.page;
                next();
            }else{
                res.status(409).end(); 
            }
        })
  };
  module.exports = reportComment;
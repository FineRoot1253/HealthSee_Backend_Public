const Album = require("../../../models").album;
const picture = require("../../../models").a_picture;
const A_Comment = require("../../../models").a_comment;

const multer = require("multer");
var today = require("../../Date/time");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000000 },
});

const updateAlbum = async (req, res, next) =>{
    let AL_Code = req.params.AL_Code;
    let leaveFile = req.body.leaveFile.split(",");
    let {
        Account_AC_NickName,
        AL_Content,
        AL_Scope
   } = req.body;
  
  console.log(req.files);
  console.log(AL_Code);
  let uploadFile = req.files ? req.files : null;

  let album = await Album.update(
      {
    AL_Content,
    AL_Scope,
    Account_AC_NickName,
    AL_Creation_Date : today,
  },
  {where : {AL_Code}}
  );
  if(req.files){
    for(var i = 0 ; i < req.files.length; i++){
      await picture.create({
          AP_Picture : uploadFile[i].buffer,
          AP_Picture_Type: uploadFile[i].mimetype,
          Album_AL_Code: AL_Code
      });
    }
  }

  if (leaveFile) {
    for (var i = 0; i < leaveFile.length; i++) {
      await picture.destroy({ where: { AP_Code: leaveFile[i] } });
    }
  }

  req.body.self = true;
  next();
  // res.end();
}

const updateComment = async (req, res, next) => {
  var ACO_Code = req.body.ACO_Code;
  var ACO_Content = req.body.ACO_Content;

  var comment = await A_Comment.findOne({
    where: { ACO_Code },
  });
  req.params.AL_Code = comment.Album_AL_Code;

  await A_Comment.update({ ACO_Content }, { where: { ACO_Code: ACO_Code } });
  req.params.page = req.body.page;
  console.log("asdasd", req.body.page);
  next();
};

module.exports = { updateAlbum, updateComment };


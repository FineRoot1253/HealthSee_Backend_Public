const Album = require("../../../models").album;
const picture = require("../../../models").a_picture;
const A_Comment = require("../../../models").a_comment;

const multer = require("multer");
var today = require("../../Date/time");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000000 },
});


const writeAlbum = async (req, res, next) =>{

  let {
    Account_AC_NickName,
    AL_Content,
    AL_Scope
  } = req.body;
  

  let album = await Album.create({
    Account_AC_NickName,
    AL_Thumbnail : req.files[req.files.length-1].buffer,
    AL_Content,
    AL_Scope,
    AL_Creation_Date : today
  });
  //'2020-09-18 12:00:00'

  if(req.files){
    for(var i = 0 ; i < req.files.length-1; i++){
      await picture.create({
          AP_Picture : req.files[i].buffer,
          AP_Picture_Type: req.files[i].mimetype,
          Album_AL_Code: album.AL_Code
      });

    }
  }

  req.params.AL_Code = album.AL_Code;
  req.body.self = true;
  next();
  // res.end();
}

const writeComment = async (req, res, next) => {
  let ACO_Content = req.body.ACO_Content;
  let Album_AL_Code = req.body.Album_AL_Code;
  let ACO_Writer_NickName = req.body.user.username;
  let ACO_Creation_Date = today;
  let Album_Account_AC_NickName = req.body.Album_Account_AC_NickName;
  



  await A_Comment.create({
    ACO_Content,
    Album_AL_Code,
    ACO_Writer_NickName,
    ACO_Creation_Date,
    Album_Account_AC_NickName
  });

  
  req.params.AL_Code = Album_AL_Code;
  req.params.page = req.body.page ? req.body.page : 1;

  next();
};

module.exports = { writeAlbum, writeComment, upload };


const A_Comment = require("../../../models").a_comment;
const album = require("../../../models").album;
const { Op } = require("sequelize");
const Picture = require("../../../models").a_picture;

const readPost = async (req, res, next) => {
  var AL_Code = req.params.AL_Code;

  var responseData = {};

  var Album = await album.findOne({
    where: { AL_Code },
  });
  // 블럭된 유저인지 체크


  var pictures = await Picture.findAndCountAll({
      where : {Album_AL_Code : Album.AL_Code},
      order: [
        ["AP_Code", "ASC"],
      ],
  });


  // 댓글 1페이지
  comments = await A_Comment.findAndCountAll({
    where: { Album_AL_Code: AL_Code },
    order: [
      ["ACO_Code", "ASC"],
    ],
  });

  
  if(req.method === 'GET')
    username = req.body.user.username;
  else
    username = req.body.username;

 
   responseData.albumDetail = Album;
   responseData.picture = pictures.rows[0];
   responseData.picturesCount = pictures.count;
   responseData.lastPage =
    Math.ceil(comments.count / 20) == 0 ? 1 : Math.ceil(comments.count / 20);
    console.log(responseData.lastPage);
    console.log(responseData.picture);
   responseData.comments = comments.rows;
   console.log(responseData.comments,'asdfasdfasdfasdf');
   responseData.commentsCount = comments.count;

  return res.json(responseData);
};

const readPicture = async (req, res, next) => {

  let AP_Code = req.params.AP_Code; 

  var pictures = await Picture.findOne({
    where : {AP_Code : AP_Code},
});

return res.json(pictures);
};

const readComment = async (req, res, next) => {
  var AL_Code = req.params.AL_Code;
  var offset = 0;
  var page = req.params.page;

  if(page > 1)
    offset = (page - 1) * 20;
  else if (page < 1)
    {
      // 에러 발생
    }

  var responseData = {};
  comments = await A_Comment.findAndCountAll({
    where: { Album_AL_Code: AL_Code },
    order: [
      ["ACO_Code", "DESC"],
    ],
    limit : 20, offset: offset
  });
  responseData.comments = comments.rows;
  responseData.commentsCount = comments.count;
  responseData.lastPage = Math.ceil(comments.count / 20);
  res.json(responseData);
};



module.exports = { readPost, readComment , readPicture};

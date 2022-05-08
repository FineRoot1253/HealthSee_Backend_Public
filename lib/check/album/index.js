const A_Comment = require("../../../models").a_comment;
const Album = require("../../../models").album;

const checkPost = async (req, res, next) => {
  const AL_Code = req.params.AL_Code ? req.params.AL_Code : req.body.AL_Code;

  if (!AL_Code) {
    res.status(400).end();
    return;
  }
  console.log(AL_Code);

  try {
    const post = await Album.findOne({ where: { AL_Code } });

    if (!post) {
      res.status(404).end();
      return;
    }

    // req.body.writerNickName = post.Account_AC_NickName;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

const checkComment = async (req, res, next) => {
  let ACO_Code;

  if (req.method === "PATCH" || req.method === "POST")
    ACO_Code = req.body.A_Comment_ACO_Code
      ? req.body.A_Comment_ACO_Code
      : req.body.ACO_Code;
  else ACO_Code = req.params.ACO_Code;

  console.log(ACO_Code);

  if (!ACO_Code) {
    res.status(400).end();
    console.log("없엉");
    return;
  }

  try {
    const comment = await A_Comment.findOne({ where: { ACO_Code } });

    if (!comment) {
      res.status(404).end();
      return;
    }
    req.body.AL_Code = comment.Album_AL_Code;
    req.body.writerNickName = comment.ACO_Writer_NickName;
    next();
  } catch (error) {
    res.status(500).end();
  }
};

module.exports = { checkPost, checkComment };

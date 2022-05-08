const BoardDetail = require("../../../models").boarddetail;
const B_Comment = require("../../../models").b_comment;

const checkPost = async (req, res, next) => {
  const BO_Code = req.params.BO_Code ? req.params.BO_Code : req.body.BO_Code;

  if (!BO_Code) {
    res.status(400).end();
    return;
  }
  console.log(BO_Code);

  try {
    const post = await BoardDetail.findOne({ where: { BO_Code } });

    if (!post) {
      res.status(404).end();
      return;
    }
    console.log(post);

    req.body.writerNickName = post.BO_Writer_NickName;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

const checkComment = async (req, res, next) => {
  let BC_Code;

  if (req.method === "PATCH" || req.method === "POST")
    BC_Code = req.body.BC_Code;
  else BC_Code = req.params.BC_Code;

  console.log(BC_Code);

  if (!BC_Code) {
    res.status(400).end();
    return;
  }

  try {
    const comment = await B_Comment.findOne({ where: { BC_Code } });

    if (!comment) {
      res.status(404).end();
      return;
    }

    req.body.writerNickName = comment.BC_Writer_NickName;
    next();
  } catch (error) {
    res.status(500).end();
  }
};

module.exports = { checkPost, checkComment };

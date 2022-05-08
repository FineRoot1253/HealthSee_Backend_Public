const B_Comment = require("../../../models").b_comment;
const Board = require("../../../models").board;

const deleteComment = async (req, res, next) => {
  var BC_Code = req.params.BC_Code;
  var comment = await B_Comment.findOne({
    where: { BC_Code },
  });

  req.params.BO_Code = comment.Board_BO_Code;
  console.log(req.params.BO_Code);
  await B_Comment.update({BC_State : 2},{where : {BC_Code}})
    .catch((err) => {
      console.error(err);
      res.status(401).end();
    });
    next();
};

const deletePost = async (req, res) => {
  console.log(req.params);
  var BO_Code = req.params.BO_Code;

  await Board.destroy({ where: { BO_Code: BO_Code } })
    .then(() => {
      res.json({ result: 1 });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { deleteComment, deletePost };

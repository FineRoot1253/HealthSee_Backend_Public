const Album = require("../../../models").album;
const A_Comment = require("../../../models").a_comment;

const deleteComment = async (req, res, next) => {
  var ACO_Code = req.params.ACO_Code;
  var comment = await A_Comment.findOne({
    where: { ACO_Code },
  });

  req.params.AL_Code = comment.Album_AL_Code;
  console.log(req.params.AL_Code);
  await A_Comment.destroy({ where: { ACO_Code: ACO_Code } })
  .catch((err) => {
    console.error(err);
  });
    next();
};

const deletePost = async (req, res) => {
  console.log(req.params);
  var AL_Code = req.params.AL_Code;

  await Album.destroy({ where: { AL_Code: AL_Code } })
    .then(() => {
      res.json({ result: 1 });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { deleteComment, deletePost };

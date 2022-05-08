var express = require("express");
var router = express.Router();
const writeComment = require("../../../lib/sequelize/album/writeAlbum")
  .writeComment;
const readComment = require("../../../lib/sequelize/album/readAlbum")
  .readComment;
const reportComment = require("../../../lib/sequelize/album/reportAlbumComment");
const checkComment = require("../../../lib/check/album").checkComment;
const deleteComment = require("../../../lib/sequelize/album/deleteAlbum")
  .deleteComment;
const updateComment = require("../../../lib/sequelize/album/updateAlbum")
  .updateComment;
const checkLogin = require("../../../lib/check/user").checkLogin;
const checkPost = require("../../../lib/check/album").checkPost;

//댓글 쓰기
router.post("/:AL_Code", checkPost, writeComment, readComment);

//댓글 가져오기
router.get("/:AL_Code&:page", checkPost, readComment);

//댓글 수정
router.patch(
  "/:AL_Code",
  checkPost,
  checkComment,
  checkLogin,
  updateComment,
  readComment
);

//댓글 차단
router.post(
  "/report/:AL_Code",
  checkPost,
  checkComment,
  reportComment,
  readComment
);

//댓글 삭제
router.delete(
  "/:AL_Code&:ACO_Code&:page",
  checkLogin,
  checkPost,
  checkComment,
  deleteComment,
  readComment
);

module.exports = router;

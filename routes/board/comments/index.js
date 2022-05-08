var express = require("express");
var router = express.Router();
const writeComment = require("../../../lib/sequelize/board/writeBoard")
  .writeComment;
const readComment = require("../../../lib/sequelize/board/readBoard")
  .readComment;
const { checkLogin } = require("../../../lib/check/user");
const { checkComment } = require("../../../lib/check/board");
const deleteComment = require("../../../lib/sequelize/board/deleteBoard")
  .deleteComment;
const updateComment = require("../../../lib/sequelize/board/updateBoard")
  .updateComment;
const reportComment = require("../../../lib/sequelize/board/reportComment");
// 댓글 작성
router.post("/", writeComment, readComment);

router.post("/report", reportComment, readComment);

// 해당 BO_CODE의 댓글 조회
router.get("/:BO_Code&:page", readComment);

router.patch("/", checkComment, checkLogin, updateComment, readComment);

//router.delete("/:BC_Code",deleteComment, readComment);
router.delete(
  "/:BC_Code&:page",
  checkComment,
  checkLogin,
  deleteComment,
  readComment
);

module.exports = router;

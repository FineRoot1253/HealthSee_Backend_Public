var express = require("express");
var router = express.Router();
const downloadFile = require("../../../lib/sequelize/board/downloadFile");
const writePost = require("../../../lib/sequelize/board/writeBoard").writePost;
const upload = require("../../../lib/sequelize/board/writeBoard").upload;
const readPost = require("../../../lib/sequelize/board/readBoard").readPost;
const deletePost = require("../../../lib/sequelize/board/deleteBoard")
  .deletePost;
const { checkLogin } = require("../../../lib/check/user");
const { checkPost } = require("../../../lib/check/board");
const reportPost = require("../../../lib/sequelize/board/reportPost");
const pushHealthsee = require("../../../lib/sequelize/board/pushHealthsee");
const updatePost = require("../../../lib/sequelize/board/updateBoard")
  .updatePost;
const usersComments = require("../../../lib/sequelize/board/readBoard")
  .usersComments;

router.get("/users/", usersComments);
// 게시글 작성
router.post("/", checkLogin, upload.array("files"), writePost, readPost);

router.get("/download/:code", downloadFile);

// 해당 BO_CODE의 게시글 조회
router.get("/:BO_Code", readPost);
// 해당 BO_CODE의 게시글 조회

// 해당 BO_CODE의 게시글 삭제
router.delete("/:BO_Code", checkPost, checkLogin, deletePost);
router.patch(
  "/:BO_Code",
  checkPost,
  upload.array("files"),
  updatePost,
  readPost
);
// 신고
router.post("/report", checkPost, checkLogin, reportPost);

// 추천
router.post("/health", checkPost, checkLogin, pushHealthsee);

module.exports = router;

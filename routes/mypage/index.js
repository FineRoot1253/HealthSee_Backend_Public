var express = require("express");
const readMyPage = require("../../lib/sequelize/mypage/readMypage").readMyPage;
const readUserList = require("../../lib/sequelize/mypage/readMypage").readUserList;
const updateMypage = require("../../lib/sequelize/mypage/updateMypage").updateMypage;

const upload = require("../../lib/sequelize/mypage/updateMypage").upload;

var router = express.Router();

// 마이페이지 수정
router.patch("/", upload.single("files"), updateMypage);

// 마이페이지 조회
router.get("/:owner", readMyPage);
router.get("/", readUserList);

module.exports = router;

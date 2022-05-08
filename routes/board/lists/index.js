var express = require("express");
var router = express.Router();
const readList = require("../../../lib/sequelize/board/readList").readList;
const bestList = require("../../../lib/sequelize/board/readList").bestList;
const usersLists = require("../../../lib/sequelize/board/readList").usersLists;
// 1. /search 게시글 전체 검색
// 반환 값 -> 게시글 20개 { BO_CODE, BO_TITLE, BO_HIT, 해당 BO_CODE와 관련된 댓글 수, 추천 수 등등 }

router.get("/", readList);
router.get("/:name&:count", bestList);
router.get("/users/", usersLists)

module.exports = router;

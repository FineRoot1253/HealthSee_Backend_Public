var express = require("express");
var router = express.Router();
const readList = require("../../../lib/sequelize/plan/readPlanList").readList;
const bestList = require("../../../lib/sequelize/plan/readPlanList").readBestList;
const userLists = require("../../../lib/sequelize/plan/readPlanList").readUserLogList;
// 1. /search 게시글 전체 검색
// 반환 값 -> 게시글 20개 { BO_CODE, BO_TITLE, BO_HIT, 해당 BO_CODE와 관련된 댓글 수, 추천 수 등등 }

router.get("/bestPlanList/", bestList);
router.get("/", readList);
router.get("/:name&:keyword", readList); 
// 검색 기능 + 내 리스트 찾는 기능 PL_Code만 들어있다면 최신글 페이지에서 다음페이지를 가져와달라는 의미 그냥 최신리스트 받아오기


router.get("/UserLogList/:name", userLists);

module.exports = router;
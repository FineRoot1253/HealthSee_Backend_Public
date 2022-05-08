let express = require("express");
let router = express.Router();
// const writeExercise = require("../../lib/sequelize/exercise/writeExercise").writeExercise;
// const writeReview = require("../../lib/sequelize/exercise/writeExercise").writeReview;
const readAll = require("../../lib/sequelize/exercise/readExercise").readAll;
const readExerciseList = require("../../lib/sequelize/exercise/readExercise")
  .readExerciseList;
const readReviews = require("../../lib/sequelize/exercise/readExercise")
  .readReviews;

// 운동 리스트 받아오기
router.get("/list/", readExerciseList);
// 운동 하나 받아오기
router.get("/:EX_Name", readAll);

// 해당 운동의 리뷰들 받아오기
router.get("/review/:EX_Name&:page", readReviews);

// 운동 생성
// router.post("/", writeExercise);
// /운동 리뷰 생성
// router.post("/review", writeReview, readAll);

module.exports = router;

const Exercise = require("../../../models").exercise;
const ExerciseRate = require("../../../models").exerciserate;
const E_evaluation = require("../../../models").e_evaluation;
const ExerciseList = require("../../../models").exerciselist;
const { Op } = require("sequelize");


const readExerciseList = async (req, res, next) => {
  // 몇번째 운동부터 받아올 것인지 나타냄
 
  // 검색했을 때 검색어 기준으로 
  let keyword = req.query.keyword;
  let responseData = {};
  let offset = req.query.offset === null ?  0 : parseInt(req.query.offset);
  let condition = {
    where: {
        [Op.or]: [
         { EX_Name : { [Op.like]: "%" + keyword + "%" }},
         { EX_KO_Name : {[Op.like]: "%" + keyword + "%"}}
      ],
    },
    limit: 2,
    offset : offset,
  };
  let exerciseList = await ExerciseList.findAndCountAll(condition)


  responseData.exerciseList = exerciseList.rows;
  responseData.exerciseListCount = exerciseList.count;
  return res.json(responseData);
}

// 운동정보, 랭크, 리뷰 3가지 다 받아옴.
const readAll = async (req, res, next) => {
    // 조회하는 운동의 이름
    let EX_Name = req.params.EX_Name;
    console.log(EX_Name);
    // 요청한 유저의 정보 (요청한 유저의 리뷰를 별도로 보내줘야하기때문에 사용)
    let username = req.body.user.username;
    let responseData = {};       
  
    // 운동과 관련된 정보 조회
    let exercise = await Exercise.findOne({
      where: { EX_Name },
    });
    
    // 운동의 평점과 관련된 정보 조회
    let exerciserate = await ExerciseRate.findOne({
      where : {EX_Name},
    })

    // 운동의 리뷰들 조회 (내 리뷰는 따로 불러오기때문에 검색자의 리뷰는 제외해서 3개 들고온다.)
    comments = await E_evaluation.findAll({
      where: { Exercise_EX_Name: EX_Name, EEV_Writer_NickName : {[Op.ne] : username} },
      limit: 3,
    });
  
    //comments가 null이면 평점 및 리뷰가 없는 것이기 때문에 내 리뷰를 조회할 필요가 없음.
    if(comments)
    myComment = await E_evaluation.findOne({
      where : {
        EEV_Writer_NickName : username,Exercise_EX_Name : EX_Name
      }
    })

    responseData.exercise = exercise;
    responseData.exerciserate = exerciserate;
    responseData.myComment = myComment;
    responseData.comments = comments;
  
    return res.json(responseData);
  };
  
  // 댓글 only 페이지로 갈 때 댓글 무한 스크롤 형식으로 받아옴.
  const readReviews = async (req, res, next) => {

  let Exercise_EX_Name = req.params.EX_Name;
  let page = req.params.page;
  let offset = 0;
  let username = req.body.user.username;
  let responseData = {};

  console.log(req.params.EX_Name);
  console.log(page);
  if (page > 1) offset = (page - 1) * 20;
  else if (page < 1) {
    // 에러 발생
  }

  reviews = await E_evaluation.findAndCountAll({
      where: { Exercise_EX_Name, EEV_Writer_NickName : {[Op.ne] : username} },
      order: [
        ["EEV_Code", "DESC"],
      ],
      limit: 20,
      offset: offset,
    });
    
    responseData.reviews = reviews.rows;
    responseData.lastPage =
      Math.ceil(reviews.count / 20) == 0 ? 1 : Math.ceil(reviews.count / 20);
    
    responseData.reviewsCount = reviews.count;
    console.log("aaa", reviews.count);
  return res.json(responseData);
  };

 


  
  module.exports =  {readAll, readReviews,readExerciseList};
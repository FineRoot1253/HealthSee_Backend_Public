const BoardList = require("../../../models").boardlist;
const { Op } = require("sequelize");

const readList = async (req, res, next) => {
  name = req.query.name;
  keyword = req.query.keyword;
  BO_Code = req.query.BO_Code;
  console.log(BO_Code);
  var responseData = {};
  var condition = {
    where: {
      [Op.and]: [
        name && { [name]: { [Op.like]: "%" + keyword + "%" } },
        BO_Code && { BO_Code: { [Op.lt]: BO_Code } },
      ],
    },
    limit: 10,
  };
  var boardList = await BoardList.findAndCountAll(condition);
  console.log(boardList.count);
  responseData.boardList = boardList.rows;
  responseData.boardCount = boardList.count;
  return res.json(responseData);
};


/**
 * 08/03 홍종표
 * 혹시 이름이 애매하면 변경해도됨. 변경 후 알려주셈
 * 해당 유저가 작성한 글 목록들을 받아오는 메소드
 */
const usersLists = async (req, res, next) => {
  name = req.query.name;
  BO_Code = req.query.BO_Code;
  var responseData = {};
  var condition = {
    where: {
      [Op.and]: [
      {BO_Writer_NickName : name},
      BO_Code && { BO_Code: { [Op.lt]: BO_Code } },
      ]
    },
    limit: 10,
  };
  var boardList = await BoardList.findAndCountAll(condition);
  console.log(boardList.count);
  responseData.boardList = boardList.rows;
  responseData.boardCount = boardList.count;
  return res.json(responseData);
};


const bestList = async (req, res, next) => {
  let name = req.params.name;
  let count = Number(req.params.count);
  let responseData = {};
  bestListFree = await BoardList.findAll({
    where: 
        {
          BO_Creation_Date: {
            [Op.gt]: new Date(new Date() - 96 * 60 * 60 * 1000),
          },
        },
    order: [[`${name}`, "DESC"]],
    limit: count,
  });

  responseData.free = bestListFree;
  res.json(responseData);
};


module.exports = { readList,usersLists, bestList };
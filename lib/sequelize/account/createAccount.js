var today = require("../../../lib/Date/time");
const Account = require("../../../models").account;
const Member = require("../../../models").member;
const platforms = {
  kakao: 1,
  naver: 2,
  google: 3,
};

const createAccount = async (req, res, next) => {
  const { nickname, gender, weight, scope, name, platform, email } = req.body;
  console.log(req.body);
  const user = await Account.findOne({
    where: {
      AC_NickName: nickname,
    },
  });
  console.log(user);
  if (user) {
    res.status(409).end();
    return;
  } else {
    console.log(name);
    await Account.create({
      AC_NickName: nickname,
      AC_Name: name,
      AC_Platform: platforms[platform],
      AC_Platform_Account: email,
      AC_Creation_Date: today,
      AC_Last_Access_Date: today,
    });
    
    await Member.create({
      ME_Scope: scope,
      ME_Weight: weight,
      ME_Gender: gender,
      ME_Certificate: "user",
      Account_AC_NickName: nickname
    });
  }

  next();
};

module.exports = createAccount;

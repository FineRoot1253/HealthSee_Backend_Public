const Account = require("../../../models/").account;
var today = require("../../../lib/Date/time");
const platforms = {
  kakao: 1,
  naver: 2,
  google: 3,
};

const loginUser = async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    platform: req.body.platform,
  };
  console.log(today);
  const user = await Account.findOne({
    where: {
      AC_Platform: platforms[data.platform],
      AC_Platform_Account: data.email,
    },
  });

  if (!user) {
    console.log("DB 조회 결과 없음!");

    res.status(401).end();
    return;
  }

  req.body = {
    ...req.body,
    nickname: user.AC_NickName,
    email: user.AC_Platform_Account,
  };

  Account.update(
    { AC_Last_Access_Date: today },
    { where: { AC_Platform_Account: data.email } }
  );

  next();
};
module.exports = loginUser;

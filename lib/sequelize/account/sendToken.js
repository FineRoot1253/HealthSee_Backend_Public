const getToken = require("../../token/jwtMiddlewares").getToken;
const getRefresh = require("../../token/jwtMiddlewares").getRefreshToken;
const Token = require("../../../models").token;
var today = require("../../../lib/Date/time");

const sendToken = async (req, res) => {
  const { nickname, email } = req.body;
  const tokenInfo = {
    username: nickname,
    email: email,
  };

  const token = getToken(tokenInfo);
  res.cookie("access_token", token, {
    maxAge: 1000 * 60 * 30, // 30분
    httpOnly: true,
  });

  const refresh = getRefresh();
  if (req.body.type) {
    res.cookie("refresh_token", refresh, {
      maxAge: 1000 * 60 * 30, // 30분 쿠키에 제한 시간을 주어 웹에서는 리플레시토큰을 사용하지 못하게 하였다.
      httpOnly: true,
    });

    await Token.create({
      TK_Refresh_Token: refresh,
      TK_NickName: nickname,
      TK_Platform_Account: tokenInfo.email,
      TK_Creation_Date: today,
    });
  }
  console.log("새로 맨든 리프레시sendtoken : ",refresh);

  res.json(tokenInfo);
};

module.exports = sendToken;

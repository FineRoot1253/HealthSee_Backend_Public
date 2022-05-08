const jwt = require("jsonwebtoken");
const Token = require("../../models").token;
var today = require("../Date/time");
var moment = require("moment");

const getToken = ({ username, email }) => {

  const token = jwt.sign(
  {
    username: username,
      email: email,
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: '30m' });

  return token;
};

const getRefreshToken = () => {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "30d" });

  return token;
};


const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if(req.url ==="/auth/login"||req.url === "/auth/register"){
    return next();
  }

  if (!token) {
    //쿠키 세팅 자체가 없는 경우
    console.log("토큰 없음!");
    return res.status(401).end();
  }

  try {
    //쿠키가 있는 경우
    console.log("토큰 발견!");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("엑세스 토큰 유효함");
    req.body.user = {
      username: decoded.username,
      email: decoded.email,
    };


    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 5) {
      //쿠키의 유효기간이 5분 남은 경우
      console.log("액세스 토큰 유효기간 얼마 안남음, 액세스 토큰 재생성");
      const token = getToken(req.body.user);
      console.log("엑세스토큰 재생성 완료", token);
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 30, // 30분
        httpOnly: true,
      });
      console.log("엑세스토큰 쿠키+유효기간 재세팅 완료");
      res.cookie("refresh_token", req.cookies.refresh, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
      });
      console.log("리프레쉬토큰 유효기간 재세팅 완료");
      await Account.update(
        {
          AC_Last_Access_Date: today,
        },
        { where: { Account_AC_NickName: req.body.user.username } }
      );
      console.log("계정 마지막엑세스시간 디비세팅 완료");
    }

    return next();
  } catch (error) {
    console.log("토큰 생성중 에러발생");
    //생성중 에러 발생시 리프레쉬 재세팅 + 엑세스 토큰 재세팅 or 리프레쉬를 토대로 엑세스 토큰만 재세팅
    const rftoken = req.cookies.refresh;
    if (rftoken) {
      //리프레쉬가 쿠키에 있는지부터 검사
      const refreshToken = await Token.findOne({
        where: {
          TK_Refresh_Token: rftoken,
        },
      });
      if (refreshToken) {
        //리프레쉬가 db에 있는지 검사
        console.log("리프레쉬 토큰 & 엑세스 토큰 재생성 시작");
        console.log("시간 체크");
        if (moment
          .duration(
            moment().diff(
              moment(refreshToken.TK_Creation_Date).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            )
          )
          .asSeconds() <
          60 * 60 * 24 * 30 ) {
          //쿠기의 유효한지 남았는지 검사
          console.log("리프레쉬토큰 사용 가능");
          req.body.user = {
            username: refreshToken.TK_NickName,
            email: refreshToken.TK_Platform_Account,
          };
          const token = getToken(req.body.user);

          if (60 * 60 * 24 * 30  - 
            moment.duration(moment().diff(moment(refreshToken.TK_Creation_Date).format("YYYY-MM-DD HH:mm:ss"))).asSeconds() <
            60 * 5) {
            //5분 남았는지 검사
            console.log("리프레시 유효시간 5분 남았음, 교체 필요함");
            
            const newRfToken = getRefreshToken();
            Token.destroy({
              where: {
                TK_Refresh_Token: rftoken,
              },
            });
            await Token.create({
              TK_Refresh_Token: newRfToken,
              TK_NickName: refreshToken.TK_NickName,
              TK_Platform_Account: refreshToken.TK_Platform_Account,
              TK_Creation_Date: today,
            });
            console.log("리프레쉬 토큰 & 엑세스 토큰 재생성후 db세팅 완료");
            console.log("마지막 보내기 작업" ,token);
          res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 30, // 30분
            httpOnly: true,
          });
            res.cookie("refresh_token", newRfToken, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
            });
            console.log("리프레쉬 토큰 & 엑세스 토큰 삭제후 재생성 + 쿠키 재세팅 완료");
          }else{
            console.log("리프레시 유효시간 넉넉함, 액세스 토큰만 교체 진행함");
          res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 30, // 30분
            httpOnly: true,
          });
            res.cookie("refresh_token", req.cookies.refresh, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
            });
          }
          
          return next();
        } else {
          // 리프레시 토큰기간 만료, db에서 삭제
          console.log("리프레시 토큰 기간 만료, 디비 삭제 조치 다시 로그인 하시오");
          Token.destroy({
            where: {
              TK_Refresh_Token: rftoken,
            },
          });
        }
        return res.status(401).end();
      } else {
        // 리프레시 토큰 존재x , 다시 로그인
        console.log("DB에 토큰 존재 x 다시 로그인하시오");
        return res.status(401).end();
      }
    } else {
      console.log(
        "쿠키에 토큰이 없음, 클라이언드에 headers 다시 한번 확인바람"
      );
      return res.status(401).end();
    }
  }
};

module.exports = {
  getToken,
  getRefreshToken,
  jwtMiddleware,
};

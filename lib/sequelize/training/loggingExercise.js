const P_Log = require("../../../models").p_log;
const today = require("../../../lib/Date/time");

// 2020-08-21 LO_Detail 및 LO_Index 적용 버전
const loggingExercise = async (req, res, next) => {
  let { training, user } = req.body;

  console.log(training);

  let { timmer, success_count, fault_count, ref } = training.logData;

  let query = {
    LO_Re_Ref: ref,
    LO_Detail: success_count.toString(),
    LO_Timmer: timmer,
    LO_Fault: fault_count,

    LO_Index: training.index,

    PL_Code: training.plan,
    LO_Player_NickName: user.username,

    LO_Creation_Date: today,
  };

  let log = await P_Log.create(query);

  if (ref === "0")
    log = await P_Log.update(
      { BC_Re_Ref: log.LO_Code },
      { where: { LO_Code: log.LO_Code } }
    );

  res.json(log).end();
};
module.exports = loggingExercise;

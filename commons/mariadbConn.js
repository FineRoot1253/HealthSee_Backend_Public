require('dotenv').config();
//var mariadb = require('mariadb');


exports.adduser = function (con, nickname, name, platform, platformAccount, reportedCount, scope, weight, state, gender, callback) {
    console.log('adduser has called');

    // pool.query()
// console.log(process.env.MYSQL_HOST+" : "+
// process.env.MYSQL_PORT+" : "+process.env.MYSQL_USER+" : "+process.env.MYSQL_PASS+" : "+process.env.MYSQL_DB);
    
// this.getConnection = function(callback) { 
//     pool.getConnection() 
//     .then(conn => { callback(conn); 
//     }).catch(err => { //not connected 
//     });

//         console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var data = {
            AC_NickName : nickname,
            AC_Name : name,
            AC_Platform : platform,
            AC_Platform_Account : platformAccount,
            AC_Reported_Count : reportedCount,
            AC_Scope : scope,
            AC_Weight : weight,
            AC_State : state,
            AC_Gender : gender
        };
        

    var exec = con.query('insert into account set AC_Creation_Date=NOW(), AC_Last_Access_Date=NOW(), ?', data, function (err, result) {
        // conn.release();
        console.log('실행대상 : ' + exec.sql);

        if (err) {
            console.log('SQL 실행시 오류 발생함');
            console.dir(err);

            callback(err, null);

            return;
        }
        callback(null, result);
    });

};

exports.selecUser=function (con, username,callback){
    var exec = con.query('select AC_NickName from account where AC_NickName=?', username, function (err, result, field) {
        // conn.release();
        console.log('실행대상 : ' + exec.sql);

        if (err) {
            console.log('SQL 실행시 오류 발생함');
            console.dir(err);
            
            callback(err, null);

            return;
        }
        console.log(result);
        callback(null, result);
    });
}
exports.data;
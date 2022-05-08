const mariadb = require('mysql');
require('dotenv').config();

var DBCONN = {};

DBCONN.getcon = function () {
    return mariadb.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        connectionLimit: 5
})
};

DBCONN.dbopen = function (con) {
    con.connect(function (err) {
        if (err) {
            console.log('db con err : ' + err);
        } else {
            console.log('connecting done');
        }

    })
}

module.exports=DBCONN;

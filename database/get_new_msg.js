/*
 * Input: UserID, Timestamp, Number of Messages
 * Output: Array of unread messages
 */
var bcrypt = require('bcrypt');

module.exports = function (userid, timestamp, num, callback) {

    var conn = require('./db_conn')();

    var sql;

    sql = "SELECT MsgID, SrcID, Brief, Detail, Timestamp FROM Msg WHERE (SrcID in (SELECT SrcID FROM UserSrc WHERE UserID=? )) AND (Timestamp >= ?) ORDER BY MsgID DESC limit ?"; 

    conn.query(sql, [userid, timestamp, parseInt(num)], function (err, result) {
        var code = 0;
        if (err) {
            console.log(err.message);
            code = -3;
        }
        conn.end();

        callback(code, result);
    });

};

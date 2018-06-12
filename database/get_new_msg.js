/*
 * Input: UserID, MsgID, Number of Messages
 * Output: Array of unread messages
 */
var bcrypt = require('bcrypt');

module.exports = function (msgid, callback) {

    var conn = require('./db_conn')();

    var sql;
    
    if (parseInt(msgid) < 0) {
        sql = "SELECT MsgID, SrcID, Brief, Detail, Timestamp FROM Msg WHERE (MsgID >= ?) ORDER BY MsgID DESC LIMIT 1";
    } else {
        sql = "SELECT MsgID, SrcID, Brief, Detail, Timestamp FROM Msg WHERE (MsgID >= ?) ORDER BY MsgID DESC";
    }

    conn.query(sql, [parseInt(msgid)], function (err, result) {
        var code = 0;
        if (err) {
            console.log(err.message);
            code = -3;
        }
        conn.end();

        callback(code, result);
    });

};

/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
var bcrypt = require('bcrypt');

module.exports = function (userid, msgid, num, callback) {

    var conn = require('./db_conn')();

    var sql;

    if (parseInt(msgid) < 0) {
        sql = "SELECT MsgID, SrcID, Brief, Timestamp FROM Msg WHERE SrcID in (SELECT SrcID FROM UserSrc WHERE UserID=? )  ORDER BY MsgID DESC limit ?"; 

        conn.query(sql, [userid, parseInt(num)], function (err, result) {
            var code = 0;
            if (err) {
                console.log(err.message);
                code = -3;
            }
            conn.end();

            callback(code, result);
        });


    }

    else {
        sql = "SELECT MsgID, SrcID, Brief, Timestamp FROM Msg WHERE SrcID in (SELECT SrcID FROM UserSrc WHERE UserID=? ) AND MsgID<=?  ORDER BY MsgID DESC limit ?";


        conn.query(sql, [userid, parseInt(msgid), parseInt(num)], function (err, result) {
            var code = 0;
            if (err) {
                console.log(err.message);
                code = -3;
            }
            conn.end();

            callback(code, result);
        });

    }

};

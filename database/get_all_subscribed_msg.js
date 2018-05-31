/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
var bcrypt = require('bcrypt');

module.exports = function(userid, msgid, num, callback) {
    
    var conn = require('./db_conn')();

    var record, match_res;

    var sql1 = "SELECT * FROM Msg WHERE SrcID in (SELECT SrcID FROM UserSRC WHERE UserID=? ) AND MsgID<=?  ORDER BY MsgID DESC limit ?";
    

    conn.query(sql1, [userid, msgid, num], function (err, result) {
        var code = 0;
        if (err) {
            console.log(err.message);
            code = -3;
        }
        conn.end();
        
        callback(code);
    });
    
};

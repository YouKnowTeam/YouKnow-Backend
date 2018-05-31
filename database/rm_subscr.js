/*
 * Input: User ID, Subscription Source ID
 * Output: an integer
 * - 0: if success
 * - -3: if internal error
 */
module.exports = function(userid, subid) {
    var conn = require('./db_conn')();

    var return_code = 0;

    var sql = "DELETE FROM UserSub WHERE UserID=? AND SubID=?";
    conn.query(sql, [userid subid], function (err, result) {
        if (err) {
            console.log(err);
            return_code = -3;
        }
    });

    conn.end();

    return return_code;
};

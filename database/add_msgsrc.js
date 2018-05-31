/*
 * Input: User ID, Message Source ID
 * Output: an integer
 * - 0: if success
 * - -3: if internal error
 */
module.exports = function(userid, srcid) {
    var conn = require('./db_conn')();

    var return_code = 0;

    var sql = "INSERT INTO UserSrc (UserID, SrcID) VALUES (?, ?)";
    conn.query(sql, [userid, srcid], function (err, result) {
        if (err) {
            console.log(err);
            return_code = -3;
        }
    });

    conn.end();

    return return_code;
};

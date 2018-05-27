/*
 * Input: ID, Password
 * Output: true if success, false if ID or password incorrect
 */
module.exports = function(id, pass) {
    var conn = require('./db_conn')();

    var record_num = 0;

    var sql = "SELECT * FROM UserPass WHERE UserID=? AND Password=?";
    conn.query(sql, [id, pass], function (err, result) {
        if (err) throw err;
        record_num = result.length;
    });

    conn.end();

    return (record_num == 1);
};

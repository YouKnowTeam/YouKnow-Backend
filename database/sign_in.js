/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
module.exports = function(id, pass) {
    var conn = require('./db_conn')();

    var record;

    var sql1 = "SELECT * FROM UserPass WHERE UserID=? AND Password=?";
    conn.query(sql, [id, pass], function (err, result) {
        if (err) throw err;
        record = result;
    });
    
    conn.end();
    
    if (record.length == 0) return -2;
    if (record.length > 1) return -3;
    
    if (record[0].Password != pass) return -1;
    
    return 0;
};

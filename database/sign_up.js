/*
 * Input: ID, Password
 * Output: true if no duplicate username, false otherwise
 */
module.exports = function(id, pass) {
    var conn = require('./db_conn')();

    var record_num = 0;

    var sql1 = "SELECT * FROM UserPass WHERE UserID=?";
    conn.query(sql, [id], function (err, result) {
        if (err) throw err;
        record_num = result.length;
    });

    if (record_num == 0) {
        var sql2 =
            "INSERT INTO UserPass (UserID Password) VALUES (?, ?)";
        conn.query(sql, [id, pass], function (err, result) {
            if (err) throw err;
        });
    }

    conn.end();

    return (record_num == 0);
};

/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -2 if user ID already exists
 * - -3 if internal error
 */
module.exports = function(id, pass) {
    const argon2 = require('argon2');

    var conn = require('./db_conn')();

    var record_num = 0;
    var hashed_pass;

    var sql1 = "SELECT * FROM UserPass WHERE UserID=?";
    conn.query(sql, [id], function (err, result) {
        if (err) throw err;
        record_num = result.length;
    });
    
    conn.end();
    
    if (record_num > 1) return -3;
    if (record_num == 1) return -2;
    
    argon2.hash('pass').then(hash => {
        hashed_pass = hash;
    }).catch(err => {
        throw err;
    });

    var sql2 = "INSERT INTO UserPass (UserID Password) VALUES (?, ?)";
    conn.query(sql, [id, hashed_pass], function (err, result) {
        if (err) throw err;
    });

    return 0;
};

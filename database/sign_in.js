/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
module.exports = function(id, pass) {
    const argon2 = require('argon2');
    
    var conn = require('./db_conn')();

    var record, match_res;

    var sql = "SELECT * FROM UserPass WHERE UserID=?";
    conn.query(sql, [id], function (err, result) {
        if (err) throw err;
        record = result;
    });
    
    conn.end();
    
    if (record.length == 0) return -2;
    if (record.length > 1) return -3;
    
    argon2.verify(record[0].Password, pass).then(match => {
        if (match) {
            match_res = true;
        } else {
            match_res = false;
        }
    }).catch(err => {
        throw err;
    });
    
    if (match_res == false) return -1;
    
    return 0;
};

/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
var bcrypt = require('bcrypt');

module.exports = function(id, pass) {
    
    var conn = require('./db_conn')();

    var record, match_res;

    var sql = "SELECT * FROM UserPass WHERE UserID=?";
    conn.query(sql, [id], function (err, result) {
        if (err) console.log(err.message);
        record = result;
    });
    
    
    if (record.length == 0) return -2;
    if (record.length > 1) return -3;
    
  
    match_res = bcrypt.compareSync(record[0].Password, pass);

    if (match_res == false) return -1;

    conn.end();
    
    return 0;
};

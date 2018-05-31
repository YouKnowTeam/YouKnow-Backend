/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -1 if password incorrect
 * - -2 if user ID does not exist
 * - -3 if internal error
 */
var bcrypt = require('bcrypt');

module.exports = function(id, pass, callback) {
    
    var conn = require('./db_conn')();

    var record, match_res;

    var sql = "SELECT * FROM UserPass WHERE UserID=?";
    conn.query(sql, [id], function (err, result) {
        if (err) console.log(err.message);

        record = result;
        var code = 0;
        if (record.length == 0) code = -2;
        else if (record.length > 1) code = -3;
        else {
            
            var hash = bcrypt.hashSync(pass, 10);

            match_res = bcrypt.compareSync(pass, record[0].Password);
            if (match_res == false) code = -1;
        }
        conn.end();
        callback(code);
    });
    
};

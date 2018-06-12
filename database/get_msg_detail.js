var bcrypt = require('bcrypt');

module.exports = function (userid, msgid, callback) {

    var conn = require('./db_conn')();

    var sql;

    sql = "SELECT MsgID, SrcID, Detail, Timestamp FROM Msg WHERE SrcID=?"; 

    conn.query(sql, [msgid], function (err, result) {
        var code = 0;

        if (err ) {
            console.log(err.message);
            code = -3;
        }

        if (len(result)>1 ) {
            console.log('more than one msg');
            code = -3;
        }

        if(len(result)==0){
            console.log('no such msg');
            code = -2;
        }
        conn.end();

        callback(code, result);
    });


    

    

};
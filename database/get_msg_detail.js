var bcrypt = require('bcrypt');

module.exports = function (userid, msgid, callback) {

    var conn = require('./db_conn')();

    var sql;

    sql = "SELECT MsgID, SrcID, Detail, Timestamp FROM Msg WHERE MsgID=?"; 

    conn.query(sql, [msgid], function (err, result) {
        var code = 0;
        console.log("result:" + result);
        console.log("len:" + result.length);
        if (err ) {
            console.log(err.message);
            code = -3;
        }

        if (result.length>1 ) {
            console.log('more than one msg');
            code = -3;
        }

        if(result.length==0){
            console.log('no such msg');
            code = -2;
        }
        conn.end();

        callback(code, result);
    });

};

/*
 * Input: User ID
 * Output: An array of obejcts consisting of properties `{SrcID, SrcDesc,
 * flag}`, among which `SrcID` is the ID of message source, `SrcDesc`
 * is its description, and `flag` shows if the user has subscribed it.
 */
module.exports = function(userid, callback) {
    var conn = require('./db_conn')();

    var all_src, user_src;

    var sql1 = "SELECT * FROM MsgSrc";
    conn.query(sql1, function (err, result) {
        var code=0
        if (err) {
            code=-3
            console.log(err);
        }
        console.log("result:"+result+typeof(result))
        all_src = result;
        var sql2 = "SELECT * FROM UserSrc WHERE UserID=?";
        conn.query(sql2, [userid], function (err, result) {
            if (err) {
                code=-3
                console.log(err);
            }
            user_src = result;
            console.log("all_src:"+all_src+typeof(all_src))
            all_src.forEach(elem => {
            var flag = 0;
            for (i = 0; i < user_src.length; i++) {
                if (user_src[i].SrcID == elem.SrcID) {
                    flag = 1;
                    break;
                }
            }
            elem.flag = flag;
            conn.end();
            callback(code, all_src)
        });       
    });
});

    

    

    return all_src;
};

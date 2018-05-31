/*
 * Input: User ID
 * Output: An array of obejcts consisting of properties `{SubID, SubDescr,
 * flag}`, among which `SubID` is the ID of subscription source, `SubDescr`
 * is its description, and `flag` shows if the user has subscribed it.
 */
module.exports = function(userid) {
    var conn = require('./db_conn')();

    var all_sub, user_sub;

    var sql1 = "SELECT * FROM Subscr";
    conn.query(sql1, function (err, result) {
        if (err) console.log(err);
        all_sub = result;
    });

    var sql2 = "SELECT * FROM UserSub WHERE UserID=?";
    conn.query(sql2, [userid], function (err, result) {
        if (err) console.log(err);
        user_sub = result;
    });

    all_sub.forEach(elem => {
        var flag = 0;
        for (i = 0; i < user_sub.length; i++) {
            if (user_sub[i].SubID == elem.SubID) {
                flag = 1;
            }
        }

        elem.flag = flag;
    });

    conn.end();

    return all_sub;
};

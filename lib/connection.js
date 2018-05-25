module.exports = class Connection {
    constructor() {
        const get_conn = require('./db_conn.js');

        this.conn = get_conn();
    }

    /*
     * Input: ID, Password
     * Output: true if no duplicate username, false otherwise
     */
    sign_up(id, pass) {
        var conn = this.conn;
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

        conn.release();

        return (record_num == 0);
    }

    /*
     * Input: ID, Password
     * Output: true if success, false if ID or password incorrect
     */
    sign_in(id, pass) {
        var conn = this.conn;
        var record_num = 0;

        var sql = "SELECT * FROM UserPass WHERE UserID=? AND Password=?";
        conn.query(sql, [id, pass], function (err, result) {
            if (err) throw err;
            record_num = result.length;
        });

        conn.release();

        return (record_num == 1);
    }

    end() {
        this.conn.end();
    }
};

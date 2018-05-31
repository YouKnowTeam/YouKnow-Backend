module.exports = function() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "group3",
      password: "group3",
      database: "group3"
    });

    con.connect(function(err) {
      if (err) console.log(err.message);
    });

    return con;
};

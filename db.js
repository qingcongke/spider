const mysql = require("mysql");
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "db_lol"
});

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "db_lol"
});

let query = function(sql, values = []) {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) {
        reject(err);
      } else {
        if (values.length == 0) {
          connection.query(sql, (err, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        }
        pool.releaseConnection(connection);
      }
    });
  });
};

let query1 = function(sql, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        if (values.length == 0) {
          console.log("delete...");
          connection.query(sql, (err, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        }
        pool.releaseConnection(connection);
      }
    });
  });
};

module.exports = query;

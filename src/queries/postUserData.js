const dbConnection = require('../database/db_connection.js');

const postUserData = (first_name, last_name, cb) => {
  dbConnection.query(
    'INSERT INTO students (first_name, last_name) VALUES ($1, $2)',
    [first_name, last_name],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;

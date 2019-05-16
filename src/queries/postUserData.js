const dbConnection = require('../database/db_connection.js');

const postUserData = (name, location, cb) => {
  dbConnection.query(
    'INSERT INTO students (first_name, last_name) VALUES ($1, $2)',
    [name, location],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;

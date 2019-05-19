const dbConnection = require('../database/db_connection.js');

const postUserData = (first_name, last_name, location, cohort_name, rate, cb) => {
  dbConnection.query(
    'INSERT INTO students (first_name, last_name) VALUES ($1, $2)',
    [first_name, last_name],
    'INSERT INTO campuses (location, cohort_name) VALUES ($1, $2)',
    [location, cohort_name],
    'INSERT INTO rating (rate) VALUES ($1)',
    [rate],
    (err, res) => {
      if (err) return (err);
      cb(null, res);
    }
  );
};



module.exports = postUserData;

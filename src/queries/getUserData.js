// The code below to query your database
const dbConnection = require('../database/db_connection.js');

const getUserData = (cb) => {
  dbConnection.query('SELECT * FROM students;', (err, res) => {
    console.log('this is the response from students: ', res);
    if(err) return cb(err);
    console.log('res.rows: ', res.rows);
    cb(null, res.rows);
  });
  dbConnection.query('SELECT * FROM campuses;', (err, res) => {
    console.log('this is the response from campuses: ', res);
    if(err) return cb(err);
    console.log('res.rows: ', res.rows);
    cb(null, res.rows);
  });
  dbConnection.query('SELECT * FROM rating;', (err, res) => {
    console.log('this is the response from rating: ', res);
    if(err) return cb(err);
    console.log('res.rows: ', res.rows);
    cb(null, res.rows);
  });
};

module.exports = getUserData;

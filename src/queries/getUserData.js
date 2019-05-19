// The code below to query your database
const dbConnection = require('../database/db_connection.js');

const getUserData = (cb) => {
  // dbConnection.query('SELECT * FROM students;', (err, res) => {
  //   console.log('this is the response from students: ', res);
  //   if(err) return cb(err);
  //   console.log('res.rows: ', res.rows);
  //   cb(null, res.rows);
  // });
  // dbConnection.query('SELECT * FROM campuses;', (err, res) => {
  //   console.log('this is the response from campuses: ', res);
  //   if(err) return cb(err);
  //   console.log('res.rows: ', res.rows);
  //   cb(null, res.rows);
  // });
  // dbConnection.query('SELECT * FROM rating;', (err, res) => {
  //   console.log('this is the response from rating: ', res);
  //   if(err) return cb(err);
  //   console.log('res.rows: ', res.rows);
  //   cb(null, res.rows);
  // });

  dbConnection.query('SELECT * FROM students;', (err, res) => {
    let resArray = [];
    console.log('this is the response from students: ', res);
    if(err) return cb(err);
    console.log('res.rows for students: ', res.rows);
    resArray += JSON.stringify(res.rows);
    console.log('resArray is : ', resArray);
    //save the response somewhere and run the next query
    dbConnection.query('SELECT * FROM campuses;', (err, res) => {
        console.log('this is the response from campuses: ', res);
        if(err) return cb(err);
        console.log('res.rows for campuses: ', res.rows);
        resArray += JSON.stringify(res.rows);
        console.log('resArray after campuses is : ', resArray);
        dbConnection.query('SELECT * FROM rating;', (err, res) => {
            console.log('this is the response from rating: ', res);
            if(err) return cb(err);
            console.log('res.rows for rating: ', res.rows);
            resArray += JSON.stringify(res.rows);
            console.log('resArray after rating is : ', resArray);
            cb(null, resArray);
          });
    });
  });
};

module.exports = getUserData;

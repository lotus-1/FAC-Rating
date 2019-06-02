const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');

const postUserData = (first_name, last_name, location, cohortName, rate, cb) => {
  dbConnection.query('INSERT INTO students (first_name, last_name) VALUES ($1, $2)',
    [first_name, last_name], (err, res1) => {
      let postResArr = [];
      console.log('this is postResArr in postUserData.js: ', postResArr);
      postResArr.push(res1);
       if (err) return console.log(err);
       console.log('postResArr after students is : ', postResArr);
       dbConnection.query('INSERT INTO campuses (location, cohortName, rate) VALUES ($1, $2, $3)',
       [location, cohortName, rate], (err, res2) => {
           if (err) return console.log(err);
           console.log('postResArr after campuses is : ', postResArr);
           postResArr.push(res2);
           cb(null, postResArr);
         });
      });
};

const postLoginData = (email, password, cb) => {
    dbConnection.query('INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password],
      (error, res) => {
        if(error) throw error;
        console.log(res);
  })
};

const getEmailExist =  (email, cb) => {
  console.log('this is the email in the getEmailExist: ', email);
  dbConnection.query(`SELECT * FROM users WHERE email LIKE '%${email}%'`, (err, res) => {
    console.log(res.rows.length, 'this is the res.rows.length');
    console.log(res.rows.length > 0, 'this is the res where length > 0');
    return res.rows.length>0;
  })
};



module.exports = {postUserData, postLoginData, getEmailExist};

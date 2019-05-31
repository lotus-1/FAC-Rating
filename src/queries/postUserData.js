const dbConnection = require('../database/db_connection.js');

const postUserData = (first_name, last_name, location, cohortName, rate, studentId, cb) => {
  dbConnection.query('INSERT INTO students (first_name, last_name) VALUES ($1, $2)',
    [first_name, last_name], (err, res1) => {
      console.log('res1 is: ', res1);
      let postResArr = [];
      console.log('this is postResArr in postUserData.js: ', postResArr);
      postResArr.push(res1);
       if (err) return console.log(err);
       console.log('postResArr after students is : ', postResArr);
       dbConnection.query('INSERT INTO campuses (location, cohortName, rate, studentId) VALUES ($1, $2, $3, $4)',
       [location, cohortName, rate, studentId], (err, res2) => {
           if (err) return console.log(err);
           console.log('postResArr after campuses is : ', postResArr);
           postResArr.push(res2);
           cb(null, postResArr);
         });
      });
};
const bcrypt = require('bcryptjs');
const password = 'password';
const salt = '/B45';
bcrypt.hash(password, salt, (err, hash) => {
  dbConnection.query('INSERT INTO users (email, password) VALUES ($1, $2)',
[email, password],
(error, res) => {
  if(error) throw error;
  console.log(res);
})
})



module.exports = postUserData;

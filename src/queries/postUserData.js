const dbConnection = require('../database/db_connection.js');

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



module.exports = postUserData;

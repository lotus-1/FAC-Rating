// The code below to query your database
const dbConnection = require('../database/db_connection.js');

const getUserData = (cb) => {
  dbConnection.query(`SELECT first_name, last_name, location, cohortName, rate
     FROM students INNER JOIN campuses
     ON students.studentId=campuses.studentId;`, (err, res) => {
       console.log('resArray after rating is : ', res.rows);
            cb(null, res.rows);
          });
};



module.exports = getUserData;

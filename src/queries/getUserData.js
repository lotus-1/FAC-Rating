// The code below to query your database
const dbConnection = require('../database/db_connection.js');

const getUserData = (cb) => {
  dbConnection.query(`SELECT studentId, first_name, last_name, location, cohortName, rate
     FROM students INNER JOIN campuses
     ON students.studentId=campuses.campusId;`, (err, res) => {
            console.log('resArray after rating is : ', res);
            cb(null, res);
          });
  };


module.exports = getUserData;

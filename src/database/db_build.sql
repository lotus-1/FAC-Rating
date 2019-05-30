BEGIN;

DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS campuses CASCADE;

CREATE TABLE students (
  studentId SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL
);

CREATE TABLE campuses (

  campusId SERIAL PRIMARY KEY,
  location VARCHAR(100) NOT NULL,
  cohortName VARCHAR(100) NOT NULL,
  rate INTEGER NOT NULL,
  studentId INTEGER REFERENCES students(studentId)

);


COMMIT;

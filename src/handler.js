const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const url = require('url');

const getUserData = require('./queries/getUserData');
const postUserData = require('./queries/postUserData');

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry, there is Error </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const handlerPublic = ((request, response, url) => {
  const extension = url.split('.')[1];
  const extenstionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
    jpg: 'image/jpg',
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry , I can not find the file </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extenstionTypes[extension] });
      response.end(file);
    }
  });
});
const handlerGetDB = (response) => {
  console.log('this is the response in the handlerGetDB: ', response);
    getUserData((err, students) => {
      console.log('this is the students : ', students);
      if (err) return serverError(err, response);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(students));
    });
};

const handlerPostDB = ((request, response) => {
  console.log('this is the request url: ', request.url);
  let data = '';
  request.on('data', chunk => {
    data += chunk;
    console.log('this is the data after chunk : ', data.split('&'));
  });
  request.on('end', () => {
    // console.log('the data', data);
    const parseFirstName = querystring.parse(data).first_name;
    const parseLastName = querystring.parse(data).last_name;
    console.log('the parseData', parseFirstName);
    console.log('the parseData', parseLastName);

    postUserData(parseFirstName, parseLastName, (err, res) => {
      console.log('res', res);
      if (err) return serverError(err, response);
      response.writeHead(302, { 'Location': '/' });
      response.end(parseFirstName,parseLastName);
    });
  });
});

module.exports = {
  handlerHome,
  handlerPublic,
  handlerGetDB,
  handlerPostDB
}

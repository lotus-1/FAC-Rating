const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const requester = require('request');
const url = require('url');

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

module.exports = {
  handlerHome,
  handlerPublic
}

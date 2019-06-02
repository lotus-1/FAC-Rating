const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const url = require('url');
const bcrypt = require('bcryptjs');
const getUserData = require('./queries/getUserData');
const postUserData = require('./queries/postUserData');


const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'authentication', 'login.html');
  fs.readFile(filePath, (error, file) => {
    if(error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry, there is Error </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};


const handlerRegistr = (request, response) => {
const filePath = path.join(__dirname, '..', 'authentication', 'registration.html');
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


const handlerLogin = (request, response) => {
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

// const handlerValidation = (request, response) => {
//   console.log(request.headers.cookie);
// }


const handlerPublic = ((request, response, url) => {
  const extension = url.split('.')[1];
  const extenstionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
    jpg: 'image/jpg',
    png: 'image/png'
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
    getUserData((err, students) => {
      console.log('this is the students : ', students);
      if (err) throw err;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(students));
    });
};


const handlerHash = (request, response) => {
  let body = '';
  request.on('data', (data) => {
    body += data.toString();
  });
  request.on('end', () => {
    console.log('body is: ', body);
    const {email, password} = querystring.parse(body);
      console.log('email, password:', email, password);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            response.statusCode = 500;
            response.end('Error registiration');
            return
          } else {
            console.log('hashed password: ', hash);
            postUserData.postLoginData(email, hash, (err, result) => {
              if(err){
                response.statusCode = 500;
                response.end('Error registration');
                return
              }
              response.statusCode = 200;
              response.end('Successfully registered!');
            })
          }
      })
    })
  })
  response.writeHead(302, {
  'Location': '/',
  'Set-Cookie': 'logged_in=true; HttpOnly; Max-Age=9000'
});
  response.end();
}


const handlerPostDB = ((request, response) => {
  console.log('this is the request url: ', request.url);
  let data = '';
  request.on('data', chunk => {
    data += chunk;
    console.log('this is the data after chunk : ', data);//.split('&');
  });
  request.on('end', () => {
    // console.log('the data', data);
    const parseFirstName = querystring.parse(data).first_name;
    const parseLastName = querystring.parse(data).last_name;
    const parseLocation = querystring.parse(data).location;
    const parseCohort = querystring.parse(data).cohortName;
    const parseRate = querystring.parse(data).rate;
    // const rateInteger = Number(parseRate);

    console.log('the parseFirstName', parseFirstName);
    console.log('the parseLastName', parseLastName);
    console.log('the parseLocation', parseLocation);
    console.log('the parseCohort', parseCohort);
    console.log('the parseRate', parseRate);

    postUserData(parseFirstName, parseLastName, parseLocation, parseCohort, parseRate, (err, res) => {
      console.log('res is in handlerPostDB :', res);
      if (err) return serverError(err, response);
      response.writeHead(302, { 'Location': '/' });
      response.end(parseFirstName,parseLastName,parseLocation,parseCohort,parseRate);
    });
  });
});

module.exports = {
  handlerHome,
  handlerLogin,
  handlerRegistr,
  handlerPublic,
  handlerGetDB,
  handlerPostDB,
  handlerHash
}

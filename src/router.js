const handler = require('./handler');

const router = (request, response) => {
  const { url } = request;
console.log(url);
  if (url === '/') {
    handler.handlerHome(request, response);
  } else if (url === '/users') {
  //   getUsersHandler(response);
  // } else if (url.includes('/create-user')) {
  //   addDataHandler(response, request);
  // } else if (url.includes('public')) {
    handler.handlerPublic(url, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1> 404 not found </h1>');
  }
};

module.exports = router;

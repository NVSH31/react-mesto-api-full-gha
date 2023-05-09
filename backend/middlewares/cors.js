// const { allowedCors } = require('../utils/const');
const allowedCors = [
  'http://shpaknv15.frontend.nomoredomains.monster',
  'https://shpaknv15.frontend.nomoredomains.monster',
  'http://localhost:3000',
  'localhost:3000',
  '127.0.0.1:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsMW = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  console.log('headers =', req.headers);
  console.log('origin =', origin);
  console.log('request.method = ', method);

  const requestHeaders = req.headers['access-control-request-headers'];

  console.log('before!!! response.headers =', res.header);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    console.log(
      'after add Access-Control-Allow-Origin response.headers =',
      res.header,
    );
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { corsMW };

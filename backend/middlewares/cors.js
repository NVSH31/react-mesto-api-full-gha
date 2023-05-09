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

  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Cache-Control', 'no-cache');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { corsMW };

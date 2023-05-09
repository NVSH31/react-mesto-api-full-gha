const url = /^https?:\/\/\S{2,}\.[a-z]{2,3}\S*/;

const allowedCors = [
  'http://shpaknv15.frontend.nomoredomains.monster',
  'https://shpaknv15.frontend.nomoredomains.monster',
  'http://localhost:3000',
  'localhost:3000',
];

module.exports = { url, allowedCors };

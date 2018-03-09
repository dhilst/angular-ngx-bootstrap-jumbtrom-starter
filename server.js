const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', res.get('Host'), req.url].join(''));
    }
    next();
  }
}

app.use(morgan('combined'));
//app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));
app.get('/', function(req,res){ res.sendFile(path.resolve(__dirname, 'dist/index.html')) });

app.listen(process.env.PORT || 8080);

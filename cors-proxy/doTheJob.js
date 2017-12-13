const lib = require('./../lib.js');
const request = require('request');

function corsProxy (req, res) {
  let url = req.params[0];
  if (url.slice(0, 5) === 'https') {
    url = 'https://' + url.slice(7, url.length);
  } else if (url.slice(0, 4) === 'http') {
    url = 'http://' + url.slice(6, url.length);
  }
  if (!lib.isValidURL(url)) {
    console.log('NOT VALID');
    url = 'http://' + url;
  /*if (!lib.isValidURL(url)) {
    let text = JSON.parse(`{"error" : "${url} is not a valid url"}`)
    res.header('Content-Type', 'application/json')
    res.status(400).send(JSON.stringify(text, null, 3))
    return
  }*/
  }

  var x = request(url);
  x.on('error', function (err) {
    res.end();
    return;
  });
  req.pipe(x, {
    end: true
  });
  x.pipe(res);
}

module.exports = {
  corsProxy: corsProxy
};
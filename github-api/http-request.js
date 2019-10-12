const https = require('https');

const httpRequest = (ops, success, error) => {
  const req = https.request({
    host: ops.host,
    port: ops.post,
    path: ops.path,
    headers: {
      'user-agent': 'node.js',
      ...ops.headers
    },
    method: ops.method,
  }, res => {
    console.log(`statusCode: ${res.statusCode}`)
    let data = '';

    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
      console.log(data);

      console.log('\n', JSON.parse(data || 'null'));
      success && success(JSON.parse(data || 'null'));
    });
  });
  req.on('error', (err) => {
    console.error(err);
    error && error(err);
  });

  if (ops.method === 'POST') {
    req.write(JSON.stringify(ops.body));
  }
  req.end();
  return req;
}

module.exports = httpRequest;
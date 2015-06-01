var express = require('express');
var app = express();
var PORT = 8743;

// Serve static content, such as JS, CSS and images.
app.use(express.static(__dirname + '/../public'));

// Any GET request that isn't an image, stylesheet, script or
// font will respond with the main index.html file. This lets
// the client-side router handle application routing.
app.get(/^(\/)(?!.*fonts|img|scripts|styles).*/, function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});

// Start the Express server
app.listen(PORT);

// Start message
console.log('\nExpress server running at http://127.0.0.1:%d\n', PORT);
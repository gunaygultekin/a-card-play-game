var connect = require('connect');
var serveStatic = require('serve-static');
const open = require('open');

connect()
    .use(serveStatic(__dirname))
    .listen(8080, () => console.log('Server running on 8080...'));

open('http://localhost:8080'); // Opens the url in the default browser
/*global require*/
/*global console*/
/*jslint nomen: true*/
/*global __dirname*/
/*jslint nomen: false*/

var express = require('express');
var app = express();

// This is how to use custom middleware
// It needs ./ in require and use app.use() function
var logger = require('./logger');
app.use(logger);

// Req and res are inherited from NodeJS's http
// MIDDLEWARE */
//app.get('/', function (req, res) {
//    "use strict";
//
//    res.sendFile(__dirname + "/public/index.html");
//});

/* ABOVE OR THIS CAN BE USED IN EXPRESS */
app.use(express.static('public'));

var blocks = require('./routes/blocks');
var buildings = require('./routes/buildings');
var locations = require('./routes/locations');
app.use('/blocks', blocks);
app.use('/buildings', buildings);
app.use('/locations', locations);

app.get('/parts', function (req, res) {
    "use strict";
    
    // Proper redirecting header (custom header can be set with redirect(302, 'path'))
    res.redirect('/building');
});

app.listen(3000, function () {
    "use strict";
    
    // Server starting callback
    console.log('Listening on port 3000');
});
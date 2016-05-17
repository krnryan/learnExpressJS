/*global module*/
/*global process*/

/* THIS IS A CUSTOM MIDDLEWARE WHICH LOGS ALL THE FILES BEING LOADED */

/* The Node module system follows the CommonJS specification */
module.exports = function (req, res, next) {
    "use strict";
    
    // Date object to track the start time
    var start = +new Date(), // + converts date to a milliseconds number
        stream = process.stdout, // Standard out is a writeable stream which we will be writing the log to
        url = req.url, // Request object gives the requested URL
        method = req.method; // And the HTTP method used
    
    // Response object is an EventEmitter which we can use to listen to events
    // This runs asynchronously
    res.on('finish', function () {
        var duration = +new Date() - start,
            message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
        
        stream.write(message);
    });
    
    // Moves request to the next middleware in stack
    next();
};
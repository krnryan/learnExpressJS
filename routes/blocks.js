/*global require*/

var express = require('express');
var router = express.Router(); // Returns router instance which can be mounted as a middleware

var bodyParser = require('body-parser');
var parserUrlencoded = bodyParser.urlencoded({ extended: false }); // Extended false forces the use of the native querystring Node library

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

// Static route
//app.get('/blocks', function (req, res) {
router.route('/') // The root path relative to the path where it's mounted (app.use('/blocks, ...);)
    .get(function (req, res) {
        "use strict";

        // True when a numeric value for 'limit' is part of the URL
        // curl http://localhost:3000/blocks?limit=2 will return only 'Fixed' and 'Movable'
        if (req.query.limit >= 0) {
            res.json(Object.keys(blocks).slice(0, req.query.limit));
        } else {
            res.json(Object.keys(blocks));
        }
    })
    .post(parserUrlencoded, function (req, res) {
        "use strict";

        var newBlock = req.body;
        blocks[newBlock.name] = newBlock.description;

        res.status(201).json(newBlock.name);
    });


// Dynamic routes using :
// : creates name property on the req.params object
router.route('/:name') // The :/name path relative to the path where it's mounted
    .all(function (req, res, next) { // app.param('name', function (req, res, next) {
        "use strict";

        var name = req.params.name,
            block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        
        req.blockName = block; // This way, it can be accessed from other routes in the application

        next();
    })
    .delete(function (req, res) {
        "use strict";

        delete blocks[req.blockName];
        res.sendStatus(200);
    })
    .get(function (req, res) {
        "use strict";

        var description = blocks[req.blockName];

        if (!description) {
            res.status(404).json("No description found for " + req.params.name);
        } else {
            res.json(description);
        }
    });

module.exports = router; // Exports the router as a Node module
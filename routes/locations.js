/*global require*/

var express = require('express');
var router = express.Router(); // Returns router instance which can be mounted as a middleware

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

router.route('/:name')
    .all(function (req, res, next) { // app.param('name', function (req, res, next) {
        "use strict";

        var name = req.params.name,
            block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        
        req.blockName = block; // This way, it can be accessed from other routes in the application

        next();
    })
    .get(function (req, res) {
        "use strict";

        var location = locations[req.blockName];

        if (!location) {
            res.status(404).json("No location found for " + req.params.name);
        } else {
            res.json(location);
        }
    });

module.exports = router; // Exports the router as a Node module
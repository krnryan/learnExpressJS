/*global require*/

var express = require('express');
var router = express.Router(); // Returns router instance which can be mounted as a middleware

router.route('/')
    .get(function (req, res) {
        "use strict";

        // Check out EJS or Jade for html templating
        var building = "<ul><li>List 1</li><li>List 2</li><li>List 3</li></ul>";
        res.send(building);
    });

module.exports = router; // Exports the router as a Node module
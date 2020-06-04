var express = require('express');
var path = require('path');
var fs = require('fs-extra');
var router = express.Router();
var HttpStatus = require('http-status-codes');

var Player = require('../models/player');

/**
 * @swagger
 * /players:
 *  get:
 *    tags:
 *      - Players
 *    description: Use to request all players
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/', function (req, res) {
    Player.find({}, function (err, players) {
        if (err) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).json(err);
        }
        res.status(HttpStatus.OK).json(players);
    })
});

//Exports
module.exports = router;
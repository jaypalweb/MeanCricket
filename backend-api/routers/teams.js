var express = require('express');
var router = express.Router();

var Team = require('../models/team');

/**
 * @swagger
 * /teams:
 *  get:
 *    tags:
 *      - Teams  
 *    description: Use to request all teams
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/', function (req, res) {
    Team.find({}, function (err, teams) {
        if (err)
            console.log(err);
        res.json(teams);
    })
});

//Exports
module.exports = router;
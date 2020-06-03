var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var fs = require('fs-extra');

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
        if (err) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).json(err);
        }
        res.status(HttpStatus.OK).json(teams);
    })
});

/**
 * @swagger
 * /teams:
 *  post:
 *    tags:
 *      - Teams
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: formData
 *        name: name
 *        type: string
 *        description: name of the team
 *      - in: formData
 *        name: image
 *        type: file
 *        description: the file to upload 
 *      - in: formData
 *        name: country
 *        type: string
 *        description: country of the team
 *      - in: formData
 *        name: desc
 *        type: string
 *        description: short description of the team
 * 
 *    responses:
 *      '201':
 *        description: Created
 */
//https://swagger.io/docs/specification/2-0/describing-parameters/
//
router.post('/', function (req, res) {

    var team = new Team({
        name: req.body.name,
        country: req.body.country,
        desc: req.body.desc
    });
    team.save(function (err) {
        if (err) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err.message);
        }
        res.status(HttpStatus.CREATED).json("success");
    });
});

//Exports
module.exports = router;
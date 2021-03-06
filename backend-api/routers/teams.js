var express = require('express');
var path = require('path');
var fs = require('fs-extra');
var router = express.Router();
var HttpStatus = require('http-status-codes');

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
 * /teams/{teamId}:
 *  get:
 *    tags:
 *      - Teams
 *    parameters:
 *      - in: path
 *        name: teamId
 *        type: string
 *        description: id of the team
 *    description: Get team details by id
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Team.findById(id, function (err, team) {
        if (err) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).json(err);
        }
        res.status(HttpStatus.OK).json(team);
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

    var imageFile = "";

    //var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    if (req.files != null && typeof req.files.image !== "undefined") {
        imageFile = req.files.image.name;
        var extension = (path.extname(imageFile)).toLowerCase();
        var imgAllowedExt = [".jpg", ".jpeg", ".png"];
        if (!imgAllowedExt.includes(extension)) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ "error": "Please Upload image file only" });
        }
    }
    if (imageFile != "") {
        var productImage = req.files.image;
        var pathname = 'public/images/teams/' + imageFile;

        productImage.mv(pathname, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    var team = new Team({
        name: req.body.name,
        image: imageFile,
        country: req.body.country,
        desc: req.body.desc
    });
    team.save(function (err, t) {
        if (err) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ "error": err });
        }
        res.status(HttpStatus.CREATED).json(t);
    });
});

/**
 * @swagger
 * /teams/{teamId}:
 *  put:
 *    tags:
 *      - Teams
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: path
 *        name: teamId
 *        type: string
 *        description: id of the team
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
 *      '200':
 *        description: Updated
 */
router.put('/:id', function (req, res) {

    var imageFile = "";

    if (req.files != null && typeof req.files.image !== "undefined") {
        imageFile = req.files.image.name;
        var extension = (path.extname(imageFile)).toLowerCase();
        var imgAllowedExt = [".jpg", ".jpeg", ".png"];
        if (!imgAllowedExt.includes(extension)) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ "error": "Please Upload image file only" });
        }
    }
    if (imageFile != "") {
        var productImage = req.files.image;
        var pathname = 'public/images/teams/' + imageFile;

        productImage.mv(pathname, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    Team.findById(req.params.id, function (err, t) {
        if (err) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ "error": err });
        }

        t.name = req.body.name;
        t.country = req.body.country;
        t.desc = req.body.desc;

        if (imageFile != "") {
            var oldImage = t.image;
            fs.remove('public/images/teams/' + oldImage, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            t.image = imageFile;
        }

        t.save(function (err) {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ "error": err });
            }
            res.status(HttpStatus.OK).json(t);
        });

    });
});

/**
 * @swagger
 * /teams/{teamId}:
 *  delete:
 *    tags:
 *      - Teams
 *    parameters:
 *      - in: path
 *        name: teamId
 *        type: string
 *        description: id of the team
 * 
 *    responses:
 *      '200':
 *        description: Deleted
 */
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Team.findByIdAndRemove(id, function (err, t) {
        if (err)
            console.log(err);
        if (t.image) {
            fs.remove('public/images/teams/' + t.image, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.status(HttpStatus.OK).json({ "status": "success" });
    });


});
//Exports
module.exports = router;
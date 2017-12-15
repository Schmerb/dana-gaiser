'use strict';

const express    = require('express'),
      bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


// controllers
const mainController  = require('controllers/mainController'),
      instaController = require('controllers/instaController');


router.get('/', mainController.getIndex);

router.get('/insta', instaController.getFeed);


module.exports = router;

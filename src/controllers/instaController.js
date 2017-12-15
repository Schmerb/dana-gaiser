'use strict';

const http = require('http');
const request = require('request');

exports.getFeed = (req, res) => {
    // let maxId = req.query.maxId;
    // let query = `?max_id=${maxId}`;
    // let url = `https://www.instagram.com/richeboured/media/${maxId !== '' ? query : ''}`;
    let url = `https://www.instagram.com/richeboured/?__a=1`;
    console.log(url);
    request(url, function(err, resp, body) {
        res.json(JSON.parse(body));
    });
};
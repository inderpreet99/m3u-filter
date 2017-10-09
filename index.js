'use strict';

var request = require('request');

exports.handler = function (event, context) {
    var url = event.queryStringParameters.url,
        filter = event.queryStringParameters.hasOwnProperty('filter') ? true : false;

    request({
        uri: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        console.log('Success, with: ' + response.statusCode);

        var output = {
            "statusCode": 200,
            "headers": { 'Content-Type': 'text/html' },
            "body": body
        };

        context.succeed(output);
        context.done(null);

    });
};

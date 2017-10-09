'use strict';

var rp = require('request-promise');

exports.handler = function (event, context) {
    var url = event.queryStringParameters.url,
        filter = event.queryStringParameters.hasOwnProperty('filter') ? true : false;

    rp({
        uri: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }).then(function (response) {
        // console.log(response);

        var output = {
            "statusCode": 200,
            "headers": { 'Content-Type': 'text/html' },
            "body": body
        };

        context.succeed(output);
        context.done(null);

    }).catch(function (err) {
        console.log(err);
        context.done(err);
    });
};

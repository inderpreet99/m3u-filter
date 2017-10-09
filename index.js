'use strict';

var http = require('http');

exports.handler = function (event, context) {
    var url = event.queryStringParameters.url,
        filter = event.queryStringParameters.hasOwnProperty('filter') ? true : false;

    http.get(url, function (res) {
        console.log('Success, with: ' + res.statusCode);


        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {

                const res2 = {
                    "statusCode": 200,
                    "headers": { 'Content-Type': 'text/html' },
                    "body": rawData
                };


                context.succeed(res2);
                context.done(null);
            } catch (e) {
                console.error(e.message);
            }
        });

    }).on('error', function (err) {
        console.log('Error, with: ' + err.message);
        context.done("Failed");
    });
};

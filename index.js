'use strict';

var rp = require('request-promise');
var parser = require('parser');
var filter = require('filter');

exports.handler = function (event, context) {
    var url = event.queryStringParameters.url,
        has_remove_groups = event.queryStringParameters.hasOwnProperty('remove-groups') ? true : false;

    rp({
        uri: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }).then(function (response) {
        // console.log(response);

        var output,
            playlist,
            playlist_str;

        playlist = parser.parse(response);
        if (has_remove_groups) {
            playlist = filter.removeGroups(playlist, event.queryStringParameters['remove-groups']);
        }

        playlist_str = parser.exportToString(playlist);

        output = {
            "statusCode": 200,
            "headers": { 'Content-Type': 'text/html' },
            "body": playlist_str
        };

        context.succeed(output);
        context.done(null);

    }).catch(function (err) {
        console.log(err);
        context.done(err);
    });
};

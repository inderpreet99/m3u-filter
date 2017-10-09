'use strict';

module.exports = {
    removeGroups: function (playlist, groups_str) {
        var groups_arr = groups_str.toLowerCase().split(/[\n\r,]+/),
            filtered_playlist;

        filtered_playlist = playlist.filter(function (stream) {
            return groups_arr.indexOf(stream.group.toLowerCase()) < 0;
        });
        return filtered_playlist;
    },
    addParentalControls: function (playlist, groups_str, code) {
        var groups_arr = groups_str.toLowerCase().split(/[\n\r,]+/);

        if (typeof code !== 'string' || code.length <= 0) {
            console.log('Parental code missing. Defaulting to 1234.');
            code = '1234';
        }

        playlist.forEach(function (stream, idx) {
            if (groups_arr.indexOf(stream.group.toLowerCase()) >= 0) {
                playlist[idx].parent_code = code;
            }
        });
        return playlist;
    }
};

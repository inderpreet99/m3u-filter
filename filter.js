'use strict';

module.exports = {
    removeGroups: function (playlist, groups_str) {
        var groups_arr = groups_str.toLowerCase().split(/[\n\r,]+/),
            filtered_playlist;

        filtered_playlist = playlist.filter(function(stream) {
            return groups_arr.indexOf(stream.group.toLowerCase()) < 0;
        });
        return filtered_playlist;
    }
};

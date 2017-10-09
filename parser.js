'use strict';

module.exports = {
    parse: function (playlist_str) {
        var streams = [],
            playlist_arr = playlist_str.split(/[\n\r]+/),
            line,
            id,
            name,
            logo,
            group,
            url,
            i;

        playlist_arr.shift(); // Remove #EXTM3U line

        for (i = 0; i < playlist_arr.length; i++) {
            line = playlist_arr[i].replace(/[\n\r\t]/g, "");
            switch (i % 2) {
                case 0:
                    id = line.match(/tvg-id\="(.*?)"/i);
                    id = (id == null) ? '' : id[1];

                    name = line.match(/tvg-name\="(.*?)"/i);
                    name = (name == null) ? line.substr(line.lastIndexOf(',') + 1) : name[1];

                    logo = line.match(/tvg-logo\="(.*?)"/i);
                    logo = (logo == null) ? '' : logo[1];

                    group = line.match(/group-title\="(.*?)"/i);
                    group = (group == null) ? '' : group[1];

                    break;
                case 1:
                    url = line;
                    if (url.length > 0) {
                        streams.push({
                            id: id,
                            orig: name,
                            name: name,
                            logo: logo,
                            url: url,
                            group: group
                        });
                    }
                    break;
            }
        }

        return streams;
    },
    exportToString: function(playlist) {
        var playlist_str = "#EXTM3U\n";
        playlist.forEach(function(stream, idx) {
            playlist_str += '#EXTINF:-1, tvg-id="' + stream.id + '" tvg-name="' + stream.name + '" tvg-logo="' + stream.logo + '" group-title="' + stream.group + '",' + stream.name + '\n';
            playlist_str += stream.url + '\n';
        });

        return playlist_str;
    }
};

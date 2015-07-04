var google = require("googleapis");
var youtube = google.youtube("v3");
var https = require("https");
var API_KEY = "AIzaSyDnfn0wl-PHl91UlLolUsKslfyO4StbQ9Y";
var loader = require("./fileloader");
var fs = require("fs");
var path = require("path");
var videos = [];
var channelVideos = {};
var cacheFile = path.resolve(__dirname, "..", "config", "videoscache.json");
var channelCacheFile = path.resolve(__dirname, "..", "config", "channelcache.json");

function getChannelContent(channelShortname, res, second, start) {
    start = Number(start);
    if (channelVideos[channelShortname]) {
        if (channelVideos[channelShortname].length <= start) {
            res.status(404).send("Not found");
        } else {
            var end = channelVideos[channelShortname].length > start + 15 ? start + 15 : channelVideos[channelShortname].length;
            var a = channelVideos[channelShortname].slice(start, end);
            res.send(JSON.stringify(a));
        }
    } else {
        if (second) return;
        fs.readFile(channelCacheFile, {encoding: "utf8"}, function (err, data) {
            channelVideos = JSON.parse(data);
            getChannelContent(channelShortname, res, true);
        })
    }
}

exports.getChannelContent = getChannelContent;

function getAllContent(res, start, second) {
    start = Number(start);
    if (videos) {
        if(videos.length <= start) {
            res.status(404).send("Not found");
        } else {
            var end = videos.length > start + 50 ? start + 50 : videos.length;
            var a = videos.slice(start, end);
            res.send(JSON.stringify(a));
        }
    } else {
        if(second) return;
        fs.readFile(cacheFile, {encoding: "utf8"}, function (err, data) {
            videos = JSON.parse(data);
            getAllContent(res, start, true);
        })
    }
}

exports.getAllContent = getAllContent;

// Youtube duration converter hax
var iso8601DurationRegex = /(-)?P(?:([\.,\d]+)Y)?(?:([\.,\d]+)M)?(?:([\.,\d]+)W)?(?:([\.,\d]+)D)?T(?:([\.,\d]+)H)?(?:([\.,\d]+)M)?(?:([\.,\d]+)S)?/;
function parseISO8601Duration(iso8601Duration) {
    var matches = iso8601Duration.match(iso8601DurationRegex);

    var o = {
        sign: matches[1] === undefined ? '+' : '-',
        years: matches[2] === undefined ? 0 : matches[2],
        months: matches[3] === undefined ? 0 : matches[3],
        weeks: matches[4] === undefined ? 0 : matches[4],
        days: matches[5] === undefined ? 0 : matches[5],
        hours: matches[6] === undefined ? 0 : matches[6],
        minutes: matches[7] === undefined ? 0 : matches[7],
        seconds: matches[8] === undefined ? 0 : matches[8]
    };
    var t = "";
    if (o.seconds) {
        t += o.seconds < 10 ? "0" + o.seconds : o.seconds;
    } else {
        t += "00";
    }
    if (o.minutes) {
        if (o.hours) {
            t = (o.minutes < 10 ? "0" + o.minutes : o.minutes) + ":" + t;
        } else {
            t = o.minutes + ":" + t;
        }
    } else {
        if (o.hours) {
            t = "00:" + t;
        }
    }
    if (o.hours) {
        t = (o.hours < 10 ? "0" + o.hours : o.hours) + ":" + t;
    }
    return t;
}

function saveCache() {
    videos.sort(function (a, b) {
        return (a.publishedAt - b.publishedAt) * -1;
    });
    var j = JSON.stringify(videos);
    fs.writeFile(cacheFile, j);

    var channels = loader.readChannelFiles();
    channelVideos = {};
    channels.forEach(function (c) {
        if (!channelVideos[c.shortname]) {
            channelVideos[c.shortname] = [];
        }
        var a = channelVideos[c.shortname]
        videos.forEach(function (vid) {
            if (vid.channelId == c.id) {
                a.push(vid);
            }
        });
    });
    j = JSON.stringify(channelVideos);
    fs.writeFile(channelCacheFile, j);
}

function getVideoDetails(videoArray) {
    var videoIds = [];
    videoArray.forEach(function (video) {
        videoIds.push(video.id)
    });
    var ids = videoIds.join(",");
    youtube.videos.list({
        auth: API_KEY,
        part: "contentDetails,snippet",
        id: ids,
        maxResults: 50
    }, function (err, data) {
        if (err) throw err;
        var items = data.items;
        items.forEach(function (item) {

            var i = item.id;
            videoArray.forEach(function (video) {
                if (video.id == i) {
                    video.duration = parseISO8601Duration(item.contentDetails.duration);
                    video.description = item.snippet.description;
                }
            });
        });
        videos = videos.concat(videoArray);
        saveCache();
    });
}

function getVideosFromSearch(channel, pageToken) {
    var requestObject = {
        auth: API_KEY,
        channelId: channel.id,
        order: "date",
        part: "snippet",
        maxResults: "50",
        type: "video"
    };
    if (pageToken) {
        requestObject.pageToken = pageToken;
    }
    youtube.search.list(requestObject, function (err, response) {
        if (err) {
            throw err
        }
        //console.log(JSON.stringify(response));
        var items = response.items;
        var videoArray = [];
        items.forEach(function (item) {
            var snippet = item.snippet;
            var video = {
                publishedAt: new Date(snippet.publishedAt),
                title: snippet.title,
                image: snippet.thumbnails.medium.url,
                id: item.id.videoId,
                channelId: channel.id
            };
            videoArray.push(video);
        });
        setTimeout(function () {
            getVideoDetails(videoArray);
        });
        if (response.nextPageToken) {
            getVideosFromSearch(channel, response.nextPageToken);
        }
    });
}

function recache() {
    var channels = loader.readChannelFiles();
    channels.forEach(function (channel) {

        getVideosFromSearch(channel);
    });
}

exports.recache = recache;

/*module.exports = function() {
 console.log("bla");
 /*youtube.search.list({
 auth: API_KEY,
 channelId: "UCr25FxPcosdQr-0qsZS1eKQ",
 order: "date",
 part: "snippet"
 }, function (err, response) {
 if(err) {
 throw err;
 }
 console.log(JSON.stringify(response));
 })
 };*/
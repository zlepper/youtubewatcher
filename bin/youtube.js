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

function getChannelContent(channelShortname) {

}

function getAllContent(res) {
    if (videos) res.send(JSON.stringify(videos.slice(0, 51))); else
        fs.readFile(cacheFile, {encoding: "utf8"}, function (err, data) {
            res.send(data);
        })
}

exports.getAllContent = getAllContent;

function saveCache() {
    videos.sort(function (a, b) {
        return (a.publishedAt - b.publishedAt)*-1;
    });
    var j = JSON.stringify(videos);
    fs.writeFile(cacheFile, j);
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
        items.forEach(function (item) {
            var snippet = item.snippet;
            var video = {
                publishedAt: new Date(snippet.publishedAt),
                title: snippet.title,
                image: snippet.thumbnails.medium.url,
                id: item.id.videoId,
                channelId: channel.id
            };
            videos.push(video);
        });
        if (response.nextPageToken) {
            getVideosFromSearch(channel, response.nextPageToken);
        }
        saveCache();
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
var express = require("express");
var router = express.Router();
var youtube = require("../bin/youtube");

router.get("/mainstream", function(req, res, next) {
    youtube.getAllContent(res);
});

router.get("/channelstream/:channel", function(req, res, next) {
    youtube.getChannelContent(req.params.channel, res);
});

router.get("/playlists", function(req, res, next) {

});

router.get("/playlists/:list", function(req, res, next) {

});

module.exports = router;
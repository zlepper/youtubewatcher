var express = require("express");
var router = express.Router();
var youtube = require("../bin/youtube");

router.get("/mainstream/:start", function(req, res, next) {
    youtube.getAllContent(res, req.params.start);
});

/*router.get("/channelstream/:channel", function(req, res, next) {
    youtube.getChannelContent(req.params.channel, res, false, 0);
});*/

router.get("/channelstream/:channel/:start", function(req, res, next) {
    youtube.getChannelContent(req.params.channel, res, false, req.params.start);
});

router.get("/playlists", function(req, res, next) {

});

router.get("/playlists/:list", function(req, res, next) {

});

module.exports = router;
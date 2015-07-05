var express = require('express');
var router = express.Router();

router.get('/partials/about', function (req, res, next) {
    res.render('about');
});

router.get('/partials/frontpage', function (req, res, next) {
    res.render('frontpage');
});

router.get('/partials/playlists', function (req, res, next) {
    res.render('playlists');
});

router.get('/partials/channel', function (req, res, next) {
    res.render('channel');
});

router.get("/partials/player", function(req, res, next) {
    res.render("player");
});


module.exports = router;

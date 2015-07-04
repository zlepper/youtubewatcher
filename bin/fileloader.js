var path = require("path");
var fs = require("fs");

exports.readChannelFiles = function() {
    var channelsFile = path.resolve(__dirname, "..", "config", "channels.json");
    var j = fs.readFileSync(channelsFile);
    return JSON.parse(j);
};
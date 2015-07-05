# YouTubeWatcher
A youtube watcher for people who want their youtube channels in one unified stream.
The application can easily be configured to run several different channels, just change channels.json file in the config folder.

# Prerequisites
To install and use the application you need to install nodejs and npm.

## Node.JS and npm
Install nodejs and npm like so:

windows: Download and run the [installer](https://nodejs.org/download/)

ubuntu: `apt-get install nodejs npm`. Make sure to run the command as root


# Installing
To install the program just clone it of git
`git clone https://github.com/zlepper/youtubewatcher.git`

Then navigate to the directory that was just created `cd youtubewatcher`

Then run `npm install`

# Running the application
If you haven't installed pm2 you can run the application by doing `node bin/www` on windows or `nodejs bin/www` on ubuntu.

If you have installed pm2 you can run the application by doing `pm2 start bin/www`.

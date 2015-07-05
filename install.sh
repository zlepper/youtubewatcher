#!/bin/sh
sudo apt-get update &&
sudo apt-get install -y nodejs npm git &&
git clone https://github.com/zlepper/youtubewatcher.git &&
cd youtubewatcher &&
npm install &&
echo "Application is ready"

@echo off
start "" runMongo.cmd
REM call npm install -g nodemon
echo "Installing NPM Modules"
call npm install
@echo "Installing bower Modules"
call bower install
echo "Starting Portal"
nodemon
REM start "" node server.js
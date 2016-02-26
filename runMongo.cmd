@echo off
echo "Closing MongoDB"
taskkill /im mongod.exe /f
echo "Creating MongoDB Directory"
md C:\Mongo-DB\data
echo "Starting MongoDB"
start "" "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath C:\Mongo-DB\data 

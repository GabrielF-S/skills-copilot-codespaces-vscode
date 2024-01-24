//Create web server
const express = require('express');
const app = express();
//Create server
const server = require('http').Server(app);
//Create socket
const io = require('socket.io')(server);
//Create file system
const fs = require('fs');
//Create path
const path = require('path');
//Create port
const port = 3000;

//Create array of comments
let comments = [];

//Send comments to client
const sendComments = (socket) => {
    socket.emit('comments', comments);
};

//Save comments to file
const saveComments = () => {
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), 'utf8', (err) => {
        if (err) throw err;
    });
};

//Get comments from file
const getComments = () => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) throw err;
        comments = JSON.parse(data);
    });
};

//Get comments when server starts
getComments();

//When client connects
io.on('connection', (socket) => {
    console.log('Client connected');
    //Send comments to client
    sendComments(socket);
    //When client sends a comment
    socket.on('comment', (comment) => {
        //Add comment to array
        comments.push(comment);
        //Send comments to client
        sendComments(io);
        //Save comments to file
        saveComments();
    });
    //When client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

//Start listening
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




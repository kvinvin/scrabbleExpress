const mongoose = require('mongoose');
const model = require("../db/models");

//Mongoose Setup
mongoose.connect('mongodb://localhost:27017/scrabbledb', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

findUserID = async (username) => {
    console.log("Checking users for " + username);
    return await model.User.findOne({username: username}).exec();
};

handleStartGame = async (username, gameName) => {
    console.log("entered controller for handleStartGame with game " + gameName + " and user " + username);
    const userID = await findUserID(username);
    console.log("USERID: " + userID);
    const result = await model.Game.exists({gameName: gameName, username: userID});
    console.log("Result in controller is " + await result);
    return result !== null;
};

module.exports = {
    handleStartGame
};
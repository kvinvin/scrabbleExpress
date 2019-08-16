const mongoose = require('mongoose');
const model = require("../models");

//Mongoose Setup
mongoose.connect('mongodb://localhost:27017/scrabbledb', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

saveToDB = () => {
    return (err) => {
        if (err) return console.error(err);
        console.log('Log Test: saved to ScrabbleDB');
    }
};

//================================= START USER CRUD Functions ===============================
createUser = async (username, score) => {
    await model.User.create({
        username: username,
        highScore: score,
        totalScore: score,
        gamesPlayed: 1
    }, saveToDB);
};

findUser = async (username) => {
    console.log("Checking users for " + username);
    return await model.User.findOne({username: username}).exec();
};

updateUser = async (user) => {
    await model.User.updateOne(
        {_id: user._id},
        {$set: {
                highScore: user.highScore,
                totalScore: user.totalScore,
                gamesPlayed: user.gamesPlayed}
        })
};

getHighScoreUsers = async () => {
    return await model.User
        .find()
        .sort({highScore: -1})
        .limit(4);
};
//================================= END OF USER CRUD Functions ===============================

//================================= START GAME CRUD Functions ===============================
doesGameExist = async (username, gameName) => {
    return await model.Game.exists({username: username, gameName: gameName});
};

findGame = async (username) => {
    return await model.Game.find({username: username});
};

createGame = async (gameState) => {
    let game;
    let gameModel;

    game = {
        gameName: gameState.gameName,
        username: gameState.username,
        reserveLetters: gameState.reserveLetters,
        playerLetters: gameState.playerLetters,
        placedLetters: gameState.placedLetters,
        words: gameState.words,
        round: gameState.round,
        possibleLocations: gameState.possibleLocations,
        score: gameState.score
    };
    gameModel = new model.Game(game);
    gameModel.save(saveToDB);
};

getGame = async (username, gameName) => {
    return await model.Game.findOne({username: username, gameName: gameName})
};

deleteGame = async (username, gameName) => {
    await model.Game.deleteOne({username: username, gameName: gameName})
};

module.exports = {
    createUser,
    findUser,
    updateUser,
    getHighScoreUsers,
    doesGameExist,
    createGame,
    findGame,
    getGame,
    deleteGame
};
const mongoose = require('mongoose');
const model = require("../db/models");

//Mongoose Setup
mongoose.connect('mongodb://localhost:27017/scrabbledb', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

transformGameStateToModel = async (gameState) => {
    const game = {
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
    return new model.Game(game);
};

saveToDB = () => {
    return (err) => {
        if (err) return console.error(err);
        console.log('Log Test: saved to ScrabbleDB');
    }
};

saveGameToDatabase = async (gameModel) => {
    console.log("ReadyState: " + db.readyState); //0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    gameModel.save(saveToDB);
};

addUser = async (username) => {
    const user = new model.User({
        username: username
    });
    await user.save(saveToDB);
};

handleUserCreation = async (username) => {
    const usernamePresent = await model.User.findOne({username: username}).exec();
    if (usernamePresent === null) await addUser(username);
};

handleGameCreation = async (gameState) => {
    const gameModel = await transformGameStateToModel(gameState);
    await saveGameToDatabase(gameModel);
};

handleGameSave = async (gameState) => {
    await handleUserCreation(gameState.username);
    await handleGameCreation(gameState);
};

module.exports = {
    handleGameSave
};

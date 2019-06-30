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

handleGameSave = async (gameState) => {
    const usernamePresent = await model.User.findOne({username: gameState.username}).exec();
    if (usernamePresent === null) await addUser(gameState.username);
    //assign a reference of the username to the username value
    gameState.username = await model.User.findOne({username: gameState.username}).exec();
    const gameModel = await transformGameStateToModel(gameState);
    await saveGameToDatabase(gameModel);
};

module.exports = {
    handleGameSave
};

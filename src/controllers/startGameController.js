const model = require("../db/models");
const createGameLetterSet = require('../controllers/gameInitializationController');

findUserID = async (username) => {
    console.log("Checking users for " + username);
    return await model.User.findOne({username: username}).exec();
};

setUpGame = async () => {
    const shuffledLetters = await createGameLetterSet();
    const playerLetters = shuffledLetters.splice(0,7);

    return {
        playerLetters: playerLetters,
        reserveLetters: shuffledLetters,
        placedLetters: [],
        selectedLetter: {
            type: null, //either of type "player" or "board"
            location: null, //index in list where the letter is to be found
            letter: null, //the letter that was selected
            points: null, // the points of the selected letter
            roundPlaced: null //the round the selected letter was placed in
        },
        words: [],
        round: 1,
        possibleLocations: [112],
        score: 0
    }
};

handleStartGame = async (username, gameName) => {
    console.log('startGameController, Entered startGameController');

    const userID = await findUserID(username);

    if (userID !== null) {
        console.log('startGameController, Found userID: ' + userID._id);
        const gameExists = await model.Game.exists({gameName: gameName, username: userID._id});
        console.log('startGameController, Received result for game existing: ' + gameExists);
        if (!gameExists) {
            return await setUpGame();
        } else {
            return gameExists;
        }
    } else {
        console.log('No user found, creating a new game!');
        return await setUpGame();
    }
};

module.exports = {
    handleStartGame
};
const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");
const createGameLetterSet = require('./createLetterSetController');

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
    const userID = await mongooseCalls.findUser(username);

    if (userID !== null) {
        const gameExists = await mongooseCalls.doesGameExist(username, gameName);
        if (!gameExists) {
            return await setUpGame();
        } else {
            return gameExists;
        }
    } else {
        return await setUpGame();
    }
};

module.exports = {
    handleStartGame
};
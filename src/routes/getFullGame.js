const express = require('express');
const router = express.Router();
const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");

router.post('/', async function (req, res) {
    let gameName;
    let username;
    let game;

    gameName = req.body.gameName;
    username = req.body.username;
    console.log("Lets see what we have here: " + gameName + username);
    game = await mongooseCalls.getGame(username, gameName);
    console.log("To print the full game: " + game);
    console.log('score is ' + game.score);
    res.json({
        //letters player can play in current round
        playerLetters: game.playerLetters,
        reserveLetters: game.shuffledLetters,
        /*letters placed on the game board.
         *   letter: letter value
         *   points: points value for that letter
         *   roundPlaced: the round it was placed in
         *   location: location on board where it is to be placed
         *   multiplier: multiplier effect of tile letter is placed on
         */
        placedLetters: game.placedLetters,
        //letter that is currently selected
        selectedLetter: game.selectedLetter,
        words: game.words,
        round: game.round,
        //a list of possible locations where a letter can be placed. Is saved as state to avoid recalculating again
        possibleLocations: game.possibleLocations,
        score: game.score
    })
});

module.exports = router;
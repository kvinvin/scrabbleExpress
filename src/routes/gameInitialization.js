const createGameLetterSet = require('../controllers/createLetterSetController');
const express = require('express');
const router = express.Router();

//initializes a game instance to be used for starting a new game
router.get('/', async function (req, res) {
    const shuffledLetters = await createGameLetterSet();
    const playerLetters = shuffledLetters.splice(0,7);

    res.json({
        //letters player can play in current round
        playerLetters: playerLetters,
        reserveLetters: shuffledLetters,
        /*letters placed on the game board.
         *   letter: letter value
         *   points: points value for that letter
         *   roundPlaced: the round it was placed in
         *   location: location on board where it is to be placed
         *   multiplier: multiplier effect of tile letter is placed on
         */
        placedLetters: [],
        //letter that is currently selected
        selectedLetter: {
            type: null, //either of type "player" or "board"
            location: null, //index in list where the letter is to be found
            letter: null, //the letter that was selected
            points: null, // the points of the selected letter
            roundPlaced: null //the round the selected letter was placed in
        },
        words: [],
        round: 1,
        //a list of possible locations where a letter can be placed. Is saved as state to avoid recalculating again
        possibleLocations: [112],
        score: 0
    })
});

module.exports = router;
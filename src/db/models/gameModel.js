const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = Schema({
    gameName: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true
    },
    reserveLetters: [{
        letter: String,
        points: Number
    }],
    playerLetters: [{
        letter: String,
        points: Number
    }],
    placedLetters: [{
        letter: String,
        points: Number,
        roundPlaced: Number,
        location: Number,
        multiplier: String
    }],
    words: [[[
        {placedLetters: [
            {
                letter: String,
                points: Number,
                roundPlaced: Number,
                location: Number,
                multiplier: String
            }
            ]}
        ]]],
    round: Number,
    //a list of possible locations where a letter can be placed. Is saved as state to avoid recalculating again
    possibleLocations: [Number],
    score: Number
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
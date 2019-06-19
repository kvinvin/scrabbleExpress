const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { //unique username for a user
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        lowercase: true
    },
    highScore: { //highest score earned amongst all completed games
        type: Number,
        default: 0
    },
    totalScore: { //sum of score in all completed games
        type: Number,
        default: 0
    },
    gamesPlayed: { //counts only completed games, since it can later be used to calculate average score
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);
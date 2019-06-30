const mongoose = require('mongoose');
const model = require("../db/models");

//Mongoose Setup
mongoose.connect('mongodb://localhost:27017/scrabbledb', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const deleteDoneGame = async (username, gameName) => {
    const usernamePresent = await model.User.findOne({username: username}).exec();
    if (usernamePresent !== null) {
        console.log("Found user with id " + usernamePresent._id + " and actual username " + username);
        await model.Game.deleteOne({username: usernamePresent._id, gameName: gameName})
    }
    else {
        const user = new model.User({
            username: username
        });
        await user.save(saveToDB);
    }
};

saveToDB = () => {
    return (err) => {
        if (err) return console.error(err);
        console.log('Log Test: saved to ScrabbleDB');
    }
};

const updateUserStats = async (username, score) => {
    let usernamePresent = await model.User.findOne({username: username}).exec();
    if (usernamePresent !== null) {
        if (score > usernamePresent.highScore) {usernamePresent.highScore = score}
        usernamePresent.totalScore += score;

        await model.User.updateOne(
            {_id: usernamePresent._id},
            {$set: {
                highScore: usernamePresent.score,
                totalScore: usernamePresent.totalScore,
                gamesPlayed: usernamePresent.gamesPlayed++}
            })
    } else {
        const user = new model.User({
            username: username,
            highScore: score,
            totalScore: score,
            gamesPlayed: 1
        });
        await user.save(saveToDB);
    }
};

const handleGiveUp = async (giveUpInfo) => {
    console.log("Log controller-handleGiveUp: Hi, I started 1");
    await deleteDoneGame(giveUpInfo.username, giveUpInfo.gameName);
    console.log("Log controller-handleGiveUp: Hi, I started 2");
    if (giveUpInfo.saveData) {
        console.log("Log controller-handleGiveUp: Hi, I started 3");
        await updateUserStats(giveUpInfo.username, giveUpInfo.score);
        console.log("Log controller-handleGiveUp: Hi, I started 4");
    }

    /*
    TODO:
        1. find username in db                                      DONE
        2. find game -> if present, delete game                     DONE
        1. saveData === true
                i) update user info                                 DONE
                ii) if not  present: create user with score         DONE
        2. saveData === false
               i) do nothing
     */
};

module.exports = {
    handleGiveUp
};
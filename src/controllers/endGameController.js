const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");

const deleteDoneGame = async (username, gameName) => {
    const usernamePresent = await mongooseCalls.findUser(username);

    if (usernamePresent !== null) {
        await mongooseCalls.deleteGame(username, gameName)
    }
};

const updateUserStats = async (username, score) => {
    const user = await mongooseCalls.findUser(username);

    if (user !== null) {
        if (score > user.highScore) user.highScore = score;
        user.totalScore += score;
        user.gamesPlayed += 1;
        await mongooseCalls.updateUser(user)
    } else {
        await mongooseCalls.createUser(username, score)
    }
};

const handleEndGame = async (giveUpInfo) => {
    await deleteDoneGame(giveUpInfo.username, giveUpInfo.gameName);
    if (giveUpInfo.saveData) {
        await updateUserStats(giveUpInfo.username, giveUpInfo.score);
    }
};

module.exports = {
    handleEndGame
};
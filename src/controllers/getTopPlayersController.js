const model = require("../db/models");

const getBestHighScoreList = async () => {
    const highScoreList = await model.User
        .find()
        .sort({highScore: -1})
        .limit(4);

    console.log('Found in db highScore list as follows: ' + highScoreList);
};

const getBestAverageScoreList = () => {
    return undefined;
};

const getBestTotalScoreList = () => {
    return undefined;
};

module.exports = {
    getBestHighScoreList,
    getBestAverageScoreList,
    getBestTotalScoreList
};
const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");

const getBestHighScoreList = async () => {
    return await mongooseCalls.getHighScoreUsers();
};

//Feature extension: Show different kind of highscore lists
/*const getBestAverageScoreList = () => {
    return undefined;
};*/

//Feature extension: Show different kind of highscore lists
/*const getBestTotalScoreList = () => {
    return undefined;
};*/

module.exports = {
    getBestHighScoreList
};
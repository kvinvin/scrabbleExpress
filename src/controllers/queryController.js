const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");

handleQuery = async (query) => {
    const user = await mongooseCalls.findUser(query);

    //0 = no user, 1 = user exists but no games, 2 = user and games found
    if (user !== null) {
        let games;
        let gameNames = [];

        games = await mongooseCalls.findGame(user.username);
        await games.map(async (game) => {await gameNames.push(game.gameName)});

        if (gameNames.length > 0) {
            return {exists: 2, games: gameNames};
        } else {
            return {exists: 1};
        }
    } else return {exists: 0}
};

module.exports = {
    handleQuery
};
const mongooseCalls = require("../db/mongooseCalls/mongooseCalls");

const handleUserCreation = async (username) => {
    const user = await mongooseCalls.findUser(username);
    if (user === null) await mongooseCalls.createUser(username, 0)
};

const handleGameCreation = async (gameState) => {
    await mongooseCalls.createGame(gameState);
};

const handleGameSave = async (gameState) => {
    await handleUserCreation(gameState.username);
    await handleGameCreation(gameState);
};

module.exports = {
    handleGameSave
};

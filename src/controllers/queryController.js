const model = require("../db/models");

findUserID = async (username) => {
    console.log("Checking users for " + username);
    return await model.User.findOne({username: username}).exec();
};

/*
TODO:
    - once username has been verified to exist, search games
    - return game names as links
    - when user clicks a game name, the whole game will get sent from the DB (reduce load) WITH NEW ROUTE
    - then just render the game
    - Then I'm done with coding
 */

handleQuery = (query) => {
    console.log('queryController, Entered handleQuery with: ' + query);
    const userID = findUserID(query);
    if (userID !== null) {
        /*
        TODO: fetch user's game names and send them back
         */
    } else return false //false means no user could be found by this name
};
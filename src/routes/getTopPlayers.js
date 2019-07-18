const express = require('express');
const router = express.Router();
const controller = require('../controllers/getTopPlayersController');

router.post('/', async function (req, res, next) {
    const topPlayersType = req.body.topPlayersType;
    let result;
    switch (topPlayersType) {
        case 'bestHighScore': result =  await controller.getBestHighScoreList(); break;
        case 'bestAverageScore': result =  await controller.getBestAverageScoreList(); break;
        case 'bestTotalScore': result =  await controller.getBestTotalScoreList(); break;
        default: throw Error('standard options were not met, something went wrong with topPlayersType.')
    }
    const response = [];
    result.map((value) => {
        console.log("Going by value: " + value.username);
        response.push({
            username: value.username,
            highScore: value.highScore,
            gamesPlayed: value.gamesPlayed
        })
    });

    res.json({topPlayers: response});
});

module.exports = router;
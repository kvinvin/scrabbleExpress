const express = require('express');
const router = express.Router();
const controller = require('../controllers/getTopPlayersController');

router.post('/', async function (req, res, next) {
    const topPlayersType = req.body.topPlayersType;
    let result;
    switch (topPlayersType) {
        case 'bestHighScore': result =  controller.getBestHighScoreList(); break;
        case 'bestAverageScore': result =  controller.getBestAverageScoreList(); break;
        case 'bestTotalScore': result =  controller.getBestTotalScoreList(); break;
        default: throw Error('standard options were not met, something went wrong with topPlayersType.')
    }

    res.json({isOk: true, topPlayers: [
            {
                _id: null,
                username: 'firstBack',
                highScore: 4573,
                gamesPlayed: 33
            },
            {
                _id: null,
                username: 'secondBack',
                highScore: 4573,
                gamesPlayed: 33
            },
            {
                _id: null,
                username: 'thirdBack',
                highScore: 4573,
                gamesPlayed: 33
            },
            {
                _id: null,
                username: 'fourthBack',
                highScore: 4573,
                gamesPlayed: 33
            },
        ]});
});

module.exports = router;
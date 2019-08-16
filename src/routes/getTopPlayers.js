const express = require('express');
const router = express.Router();
const controller = require('../controllers/getTopPlayersController');

router.post('/', async function (req, res) {
    let topPlayersType;
    let result;
    let response = [];

    topPlayersType = req.body.topPlayersType;
    if (topPlayersType === 'bestHighScore') {
        result =  await controller.getBestHighScoreList();
    } else {
        throw Error('standard options were not met, something went wrong with topPlayersType.')
    }
    result.map((value) => {
        console.log("Going by value: " + value.username);
        response.push({
            username: value.username,
            highScore: value.highScore
        })
    });

    res.json({topPlayers: response});
});

module.exports = router;
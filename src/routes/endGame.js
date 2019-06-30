const express = require('express');
const router = express.Router();
const controller = require('../controllers/endGameController');

router.post('/', function(req,res) {
    console.log("Hi, in giveUp function");
    /*
    giveUpInfo: {
        username: String
        gameName: String
        saveData: true || false,
        score: integer
     */
    const giveUpInfo = req.body;
    console.log("Got body, about to enter controller");
    controller.handleEndGame(giveUpInfo).then();
    res.send("completed giveUp");
});


module.exports = router;
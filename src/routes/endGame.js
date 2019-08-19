const express = require('express');
const router = express.Router();
const controller = require('../controllers/endGameController');

//Update the user stats in the database
router.post('/', function(req,res) {
    const giveUpInfo = req.body;
    controller.handleEndGame(giveUpInfo).then();
    res.send("completed giveUp");
});


module.exports = router;
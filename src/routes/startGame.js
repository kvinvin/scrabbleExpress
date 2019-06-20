const express = require('express');
const controller = require('../controllers/startGameController');

const router = express.Router();
router.use(express.json());

router.post('/', (req,res) => {
    console.log("Entered startGame with " + req.body.username + " " + req.body.gameName);
    const result = controller.handleStartGame(req.body.username, req.body.gameName);
    console.log("Result in router is " + result);
    res.json({result: result})
});

module.exports = router;
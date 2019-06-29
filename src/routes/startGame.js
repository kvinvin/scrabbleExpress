const express = require('express');
const controller = require('../controllers/startGameController');

const router = express.Router();
router.use(express.json());

router.post('/', (req,res) => {
    console.log('Entered startGame with ' + req.body.username + ' ' + req.body.gameName);
    controller.handleStartGame(req.body.username, req.body.gameName)
        .then((data) => {
            if(typeof data === 'boolean') {
                console.log('Returning existing value of: ' + data);
                res.json({exists: true, game: null})
            } else {
                console.log('Returning existing value of: ' + data);
                res.json({exists: false, game: data}) //a new game json is being sent back
            }
        })
        .catch((e) => {console.log('Error in startGameRouter: ' + e)});
});

module.exports = router;
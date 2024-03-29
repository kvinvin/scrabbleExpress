const express = require('express');
const router = express.Router();
const controller = require('../controllers/startGameController');

router.use(express.json());


router.post('/', (req,res) => {
    controller.handleStartGame(req.body.username, req.body.gameName)
        .then((data) => {
            if(typeof data === 'boolean') {
                res.json({exists: true, game: null})
            } else {
                res.json({exists: false, game: data}) //a new game json is being sent back
            }
        })
        .catch((e) => {console.log('Error in startGameRouter: ' + e)});
});

module.exports = router;
const express = require('express');
const controller = require('../controllers/saveAndExitController');

const router = express.Router();
router.use(express.json());

//handles "save and exit" button press. Passes gameState to function in controller where it will be saved to the DB
router.post('/', (req,res) => {
    const gameState = req.body;
    controller.handleGameSave(gameState)
        .then(() => console.log("Game saved"))
        .catch((e) => console.log("Error with saving: " + e));
    res.json({message: "Done"});
});

module.exports = router;
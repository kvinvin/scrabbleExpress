const express = require('express');
const router = express.Router();
const controller = require('../controllers/queryController');

router.post('/', (req,res) => {
    const query = req.body;
    controller.handleQuery(query)
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
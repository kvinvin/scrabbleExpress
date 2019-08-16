const express = require('express');
const router = express.Router();
const controller = require('../controllers/queryController');

router.post('/', (req,res) => {
    const query = req.body.query;

    controller.handleQuery(query)
        .then((data) => {
            console.log("data is " + data.games);
            res.json(data)
        })
        .catch((e) => {console.log('Error in queryRouter: ' + e)});
});

module.exports = router;
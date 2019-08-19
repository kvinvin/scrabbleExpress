const express = require('express');
const router = express.Router();
const controller = require('../controllers/queryController');

//search for a list of games belonging to the user in the DB
router.post('/', (req,res) => {
    const query = req.body.query;

    controller.handleQuery(query)
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {console.log('Error in queryRouter: ' + e)});
});

module.exports = router;
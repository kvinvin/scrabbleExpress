const express = require('express');
const router = express.Router();
const controller = require('../controllers/validateWordsController');

router.post('/', function(req,res) {
  try {
    const words = req.body;
    controller.handleValidation(words)
        .then((isValid) => {
          if (isValid) {
            console.log("Returning true to the front and " + isValid);
            res.json({isValid: true})
          }
          else {
            console.log("Returning false to the front and " + isValid);
            res.json({isValid: false});
          }
        });
  } catch (e) {throw error ("Error from router: " + e)}

});

module.exports = router;
const controller = require('../controllers/validateWordsController')
const express = require('express');
const router = express.Router();

//save dictionary as an array
//const txt = fs.readFileSync('../scrabble_dictionary.txt', 'utf-8');
//const dictionary = txt.split("\n");
//const dictionaryLength = dictionary.length;
/*
//does a binary search through
const searchDictionary = (word, l, r, dic) => {
    if (r >= l) {
        const middle = l + (r-l)/2;
        const comparedWord = dic[middle];

        if (comparedWord === word) return true;
        else if (comparedWord > word) {
            searchDictionary(word, l, middle - 1, dic);
        }
        else {
            searchDictionary(word, middle + 1, r, dic);
        }
    }
    else {
        return false;
    }
};

validateWords = (words) => {
    return words.every(word => {
        const wordLetters = words.map(placedLetter => placedLetter.letter);
        searchDictionary(wordLetters, 0, dictionaryLength, dictionary)
    });
};*/

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
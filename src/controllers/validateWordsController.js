const fs = require('fs');

const wordsToStrings = (words) => {
    const wordsAsStrings = [];

    words.map((word) => {
        let wordAsString = "";
        word.map((letter) => {
            wordAsString += letter.letter;
        });
        wordAsString = wordAsString.toLowerCase();
        wordsAsStrings.push(wordAsString);
        console.log("Word is " + wordAsString);
    });
    return wordsAsStrings;
};

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

const handleValidation = async (words) => {
    //returns an array of strings formed from words played
    const wordsAsStrings = wordsToStrings(words);
    console.log("words from front are: " + wordsAsStrings[0]);

    //save dictionary as an array
    const txt = fs.readFileSync('src/db/scrabble_dictionary.txt', 'utf-8');
    const dictionary = txt.split("\n");

    const isValid = await (dictionary.indexOf(wordsAsStrings[0]) > -1);
    console.log("result for isValid is " + isValid);
    return isValid;
};

module.exports = {
    handleValidation
};
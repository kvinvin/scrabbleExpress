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
    });
    return wordsAsStrings;
};

const handleValidation = async (words) => {
    let wordsAsStrings;
    let txt;
    let isValid;

    //returns an array of strings formed from words played
    wordsAsStrings = wordsToStrings(words);
    console.log("words from front are: " + wordsAsStrings[0]);

    //save dictionary as an array
    txt = fs.readFileSync('src/db/scrabble_dictionary.txt', 'utf-8');
    const dictionary = txt.split("\n");

    isValid = await (dictionary.indexOf(wordsAsStrings[0]) > -1);
    console.log("result for isValid is " + isValid);
    return isValid;
};

module.exports = {
    handleValidation
};
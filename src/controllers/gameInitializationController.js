const Letters = require('../db/letterData');

// create a shuffled list of letters ===================================================================================
const generateArrayFromObjects = (objectList) => {
    const letters = [];
    Object.keys(objectList).forEach(key => {
        const frequency = objectList[key].frequency;
        let letter = {
            letter: objectList[key].letter,
            points: objectList[key].points
        };
        for(let i = 0; i < frequency; i++){
            letters.push(letter)
        }
    });
    return letters;
};

const shuffle = async (set) => {
    const arraySize = set.length;
    for (let i = arraySize; i > 0; i-- ) {
        const r = Math.floor(Math.random() * i);
        let temp = set[arraySize - 1];
        set[arraySize - 1] = set[r]; //places random var at end of array
        set[r] = temp;
    }
    return set
};

// =====================================================================================================================

const createGameLetterSet = () => {
    const allLetters = generateArrayFromObjects(Letters);
    return shuffle(allLetters);
};

module.exports = createGameLetterSet;
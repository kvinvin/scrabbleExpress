const Letters = require('../db/letterData');

// create a shuffled list of letters ===================================================================================
const generateArrayFromObjects = (objectList) => {
    const letters = [];
    Object.keys(objectList).forEach(key => {
        let i;
        const frequency = objectList[key].frequency;
        const letter = {
            letter: objectList[key].letter,
            points: objectList[key].points
        };

        for(i = 0; i < frequency; i++){
            letters.push(letter)
        }
    });
    return letters;
};

const shuffle = async (set) => {
    let arraySize;
    let i;

    arraySize = set.length;
    for (i = arraySize; i > 0; i-- ) {
        let r;
        let temp;

        r = Math.floor(Math.random() * i);
        temp = set[i - 1];
        set[i - 1] = set[r]; //places random var at end of array
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
import words from '../words.json';

export default function getSpecifiedNumberOfRandomWords(numberOfRandomWords: number) {
    var arrayToReturn: string[] = new Array<string>();
    for (let i = 0; i < numberOfRandomWords; i++) {
        arrayToReturn.push(words['english'][Math.floor(Math.random() * 1000)]);
    }

    return arrayToReturn;
}
import React, { useState, useEffect } from 'react';
import Results from '../Results/Results';
import getSpecifiedNumberOfRandomWords from '../utils/getSpecifiedNumberOfRandomWords';
import './TypingInput.css';

const TypingInput = () => {
    const arraySize = 25;

    let [wordArray, setWordArray] = useState(new Array<string>());
    let [wordArrayIndex, setWordArrayIndex] = useState(0);
    let [wordsPerMinute, setWordsPerMinute] = useState(0);

    useEffect(() => {
        setWordArray(getSpecifiedNumberOfRandomWords(arraySize));
    }, []);

    function handleKeyPress(event: React.KeyboardEvent): void {
        if (spaceKeyWasPressed(event.key)) {
            checkInputValue(event.currentTarget.value.trim());
            checkIfAtEndOfArray();
            clearInputs(event);
        }
    }

    function checkIfAtEndOfArray() {
        if (wordArrayIndex === wordArray.length - 1) {
            resetComponentState();
        }
    }

    function resetComponentState() {
        setWordArray(getSpecifiedNumberOfRandomWords(arraySize));
        setWordArrayIndex(0);
        Array.from(document.getElementsByTagName('span')).forEach(span => span.style.color = '#ffffff');
        clearInputs(null);
    }

    function spaceKeyWasPressed(pressedKey: string): boolean {
        return pressedKey === ' ';
    }

    function checkInputValue(insertedWord: string | null): void {
        const currentWord = wordArray[wordArrayIndex];
        const currentSpanElement: HTMLElement | null = document.getElementById(`${currentWord}${wordArrayIndex}`);
        let colorToPutOnSpanElement = "";

        if (insertedWord !== currentWord) 
            colorToPutOnSpanElement = "#ff0000";
        else
            colorToPutOnSpanElement = "#1ED760";

        if (currentSpanElement)
            markWordElementAsTyped(currentSpanElement, colorToPutOnSpanElement);

        setWordArrayIndex(wordArrayIndex + 1);
    }

    function markWordElementAsTyped(wordElement: HTMLElement, color: string): void {
        wordElement.style.color = color;
    }
    
    function clearInputs(evt: React.KeyboardEvent | null): void {
        if (evt) {
            evt.currentTarget.value = '';
        } else {
            Array.from(document.getElementsByTagName('input')).forEach(input => input.value = '');
        }
    }

    return (
        <>
            <div id="divMainInput">
                <div id="divMainWords">
                    {wordArray.map((word, index) => (<span id={`${word}${index}`} key={index}>{word}&nbsp;</span>))}
                </div>
                <div id="divWithInputAndButton">
                    <input 
                        type="text" 
                        autoComplete="off"
                        onKeyPress={(evt) => { handleKeyPress(evt); }}
                    />
                    <button type="button" onClick={resetComponentState}>Go again</button>
                </div>
                <Results currentNumberOfWordsPerMinute={wordsPerMinute} />
            </div>
        </>
    )
}

export default TypingInput;
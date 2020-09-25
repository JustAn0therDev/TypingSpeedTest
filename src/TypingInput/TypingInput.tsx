import './TypingInput.css';
import Results from '../Results/Results';
import React, { useState, useEffect, useRef } from 'react';
import ITypingInputInitialState from '../Interfaces/ITypingInputInitialState';
import getSpecifiedNumberOfRandomWords from '../utils/getSpecifiedNumberOfRandomWords';

const typingInputInitialState: ITypingInputInitialState = {
    wordArrayIndex: 0,
    wordsPerMinute: 0,
    startDateInMilisseconds: 0,
    referenceToInputElement: null
}

const TypingInput: React.FC = () => {
    const wordArraySize = 20;
    const referenceToInputElement = useRef<HTMLInputElement>(null);

    let [wordArray, setWordArray] = useState(new Array<string>());
    let [wordArrayIndex, setWordArrayIndex] = useState(0);
    let [wordsPerMinute, setWordsPerMinute] = useState(0);
    let [startDateInMilisseconds, setStartDateInMilisseconds] = useState(0);

    useEffect(() => {
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordsPerMinute(0);
        referenceToInputElement.current?.focus();
    }, []);

    function handleKeyPress(event: React.KeyboardEvent): void {
        if (event.key === ' ') {
            checkInputValue(event.currentTarget.value.trim());
            clearInputElementRefValue(referenceToInputElement);
            updateWordsPerMinute();
        }
    }

    function updateWordsPerMinute(): void {
        if (wordArrayIndex === 0) {
            setStartDateInMilisseconds(Date.now());
        } else if (wordArrayIndex === wordArraySize - 1) {
            setWordsPerMinute(getWordsPerMinute());
        }
    }

    function getWordsPerMinute(): number {
        return Math.floor((wordArraySize / ((Date.now() - startDateInMilisseconds) / 1000 / 60)));
    }

    function resetComponentState() {
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordArrayIndex(typingInputInitialState.wordArrayIndex);
        setWordsPerMinute(typingInputInitialState.wordsPerMinute);

        Array.from(document.getElementsByTagName('span'))
        .forEach(span => span.style.color = '#ffffff');

        clearInputElementRefValue(referenceToInputElement);
        referenceToInputElement.current?.focus();
    }

    function clearInputElementRefValue(referenceToElement: React.RefObject<HTMLInputElement | null>): void {
        if (referenceToElement && referenceToElement.current)
            referenceToElement.current.value = '';
    }

    function checkInputValue(insertedWord: string | null): void {
        const currentWord = wordArray[wordArrayIndex];
        const currentSpanElement: HTMLElement | null = document.getElementById(`${currentWord}${wordArrayIndex}`);

        let colorToPutOnSpanElement = "";
        
        insertedWord !== currentWord 
        ? colorToPutOnSpanElement = "#ff0000" 
        : colorToPutOnSpanElement = "#1ED760";
        
        if (currentSpanElement)
           markWordElementAsTyped(currentSpanElement, colorToPutOnSpanElement);
        
        setWordArrayIndex(wordArrayIndex + 1);
    }

    function markWordElementAsTyped(wordElement: HTMLElement, color: string): void {
        wordElement.style.color = color;
    }

    return (
        <>
            <div id="divMainInput">
                <button type="button" tabIndex={2} onClick={resetComponentState}>Reset (Esc)</button>
                <div id="divMainWords">
                    { wordArray.map((word, index) => 
                        ( <span id={`${word}${index}`} key={index}>{word}&nbsp;</span>
                        )) 
                    }
                </div>
                <div id="divWithInputAndButton">
                    <input 
                        id="mainInput" tabIndex={1}
                        ref={referenceToInputElement}
                        type="text" autoComplete="off"
                        onKeyPress={(evt) => { handleKeyPress(evt); }}
                    />
                </div>
                <Results currentNumberOfWordsPerMinute={wordsPerMinute} />
            </div>
        </>
    )
}

export default TypingInput;
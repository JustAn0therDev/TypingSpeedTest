import React from 'react';
import './TypingInput.css'

const TypingInput = () => {
    // This will be dynamically generated
    // And randomly sorted
    const wordArray = ["this", "was", "vacation", "i", "wont", "keep", "you", "waiting"];

    let wordArrayIndex = 0;
    let calculatedWordsPerMinute = 0;

    function handleKeyPress(event: React.KeyboardEvent): void {
        if (spaceKeyWasPressed(event.key)) {
            checkInputValue(event.currentTarget.value.trim());
            thenClearInput(event.currentTarget);
        }
    }

    function spaceKeyWasPressed(pressedKey: string): boolean {
        return pressedKey === " ";
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

        wordArrayIndex++;
    }

    function markWordElementAsTyped(wordElement: HTMLElement, color: string): void {
        wordElement.style.color = color;
    }
    
    function thenClearInput(inputElement: EventTarget & Element): void {
        inputElement.value = '';        
    }

    return (
        <>
            <div id="divMainInput">
                <div id="divMainWords">
                    {wordArray.map((word, index) => (<span id={`${word}${index}`} key={index}>{word}&nbsp;</span>))}
                </div>
                <input 
                    type="text" 
                    autoComplete="off"
                    onKeyPress={(evt) => { handleKeyPress(evt); }}
                 />
                <div id="divResults">
                    <h1>{calculatedWordsPerMinute} WPM</h1>
                </div>
            </div>
        </>
    )
}

export default TypingInput;
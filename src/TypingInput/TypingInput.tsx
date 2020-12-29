import './TypingInput.css';
import Results from '../Results/Results';
import { SketchPicker } from 'react-color';
import React, { useState, useEffect, useRef } from 'react';
import ITypingInputInitialState from '../Interfaces/ITypingInputInitialState';
import getSpecifiedNumberOfRandomWords from '../utils/getSpecifiedNumberOfRandomWords';

const typingInputInitialState: ITypingInputInitialState = {
    wordArrayIndex: 0,
    wordsPerMinute: 0,
    startDateInMilisseconds: 0
}

/*
    TODO:
    1 - Set localStorage from color picking event;
    2 - Get from localStorage on render;
    3 - Color prop on SketchPicker should return from localStorage if exists, else default colors (write default consts in another utils script); and
    4 - Create reset button to clear local storage and re-render component.
 */
export default function TypingInput(): JSX.Element {
    const wordArraySize = 15;

    // References to mutable elements inside component.
    const referenceToInputElement = useRef<HTMLInputElement>(null);
    const referenceToColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToBackgroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToForegroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToBackgroundColorPicker = useRef<SketchPicker>(null);
    const referenceToForegroundColorPicker = useRef<SketchPicker>(null);

    // State management
    let [wordArray, setWordArray] = useState(new Array<string>());
    let [wordArrayIndex, setWordArrayIndex] = useState(0);
    let [wordsPerMinute, setWordsPerMinute] = useState(0);
    let [startDateInMilisseconds, setStartDateInMilisseconds] = useState(0);
    let [foregroundColor, setForegroundColor] = useState("");
    let [backgroundColor, setBackgroundColor] = useState("");

    useEffect(() => {
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordsPerMinute(0);
        referenceToInputElement.current?.focus();
    }, []);

    function handleKeyPress(event: React.KeyboardEvent): void {
        if (event.key === ' ') {
            checkInputValue(event.currentTarget.value.trim());
            clearRefElementValue(referenceToInputElement);
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

        Array.from(document.getElementsByTagName('span')).forEach(span => span.style.color = '#ffffff');

        clearRefElementValue(referenceToInputElement);
        referenceToInputElement.current?.focus();
    }

    function clearRefElementValue(referenceToElement: React.RefObject<HTMLInputElement | null>): void {
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

    function handleColorPickerClick() {
        hideColorPickerDivs();
        if (referenceToColorPickerDiv.current) {
            if (referenceToColorPickerDiv.current?.style.display === "none") {
                referenceToColorPickerDiv.current.style.display = "block";
            } else {
                referenceToColorPickerDiv.current.style.display = "none";
            }
        }
    }

    function handleBackgroundColorPickerClick() {
        hideColorPickerDivs();
        if (referenceToBackgroundColorPickerDiv.current) {
            if (referenceToBackgroundColorPickerDiv.current?.style.display === "none") {
                referenceToBackgroundColorPickerDiv.current.style.display = "block";
            } else {
                referenceToBackgroundColorPickerDiv.current.style.display = "none";
            }
        }
    }

    function handleForegroundColorPickerClick() {
        hideColorPickerDivs();
        if (referenceToForegroundColorPickerDiv.current) {
            if (referenceToForegroundColorPickerDiv.current?.style.display === "none") {
                referenceToForegroundColorPickerDiv.current.style.display = "block";
            } else {
                referenceToForegroundColorPickerDiv.current.style.display = "none";
            }
        }
    }

    function hideColorPickerDivs() {
        //@ts-ignore
        document.querySelectorAll(".color-picker").forEach(el => el.style.display = "none");
    }

    return (
        <>
            <div id="divMainInput">
                <button type="button" className={"change-color change-color-buttons"}  onClick={handleColorPickerClick}>Change Colors <span role="img" aria-label="rainbow">🎨</span></button>
                <div id="div-color-picker" ref={referenceToColorPickerDiv} style={{display: "none"}}>
                    <button type="button" className={"change-background change-color-buttons"} onClick={handleBackgroundColorPickerClick}>Background <span role="img" aria-label="paintbrush">🖌️</span></button>
                    <button type="button" className={"change-foreground change-color-buttons"} onClick={handleForegroundColorPickerClick}>Foreground <span role="img" aria-label="paintbrush">🖌️</span></button>
                </div>

                <div style={{display: 'none'}} ref={referenceToBackgroundColorPickerDiv} className={"color-picker"}>
                    <SketchPicker ref={referenceToBackgroundColorPicker} />
                </div>

                <div style={{display: 'none'}} ref={referenceToForegroundColorPickerDiv} className={"color-picker"}>
                    <SketchPicker ref={referenceToForegroundColorPicker} />
                </div>

                <span id="span-reset-typing-input-state" onClick={resetComponentState}></span>
                <div id="divMainWords">
                    {wordArray.map((word, index) => (<span id={`${word}${index}`} key={index}>{word}&nbsp;</span>))}
                </div>
                <div id="divWithLabelAndInput">
                    <label htmlFor="mainInput">Type here (press esc to reset):</label>
                    <input
                        id="mainInput"
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
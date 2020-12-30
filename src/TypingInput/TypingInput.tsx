import './TypingInput.css';
import Results from '../Results/Results';
import { ChromePicker, ColorResult } from 'react-color';
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
    1 - Fix color set from LocalStorage. It cannot have any kind of parsing
    2 - Create reset button to clear local storage and reload window.
 */
export default function TypingInput(): JSX.Element {
    const wordArraySize = 15;
    const backgroundElements: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.background');
    const foregroundElements: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('.foreground');

    // Refs to mutable elements inside component.
    const referenceToInputElement = useRef<HTMLInputElement>(null);
    const referenceToColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToBackgroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToForegroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToBackgroundColorPicker = useRef<ChromePicker>(null);
    const referenceToForegroundColorPicker = useRef<ChromePicker>(null);
    const referenceToChangeColorsText = useRef<HTMLSpanElement>(null);

    // State management
    let [wordArrayIndex, setWordArrayIndex] = useState(0);
    let [wordsPerMinute, setWordsPerMinute] = useState(0);
    let [foregroundColor, setForegroundColor] = useState("");
    let [backgroundColor, setBackgroundColor] = useState("");
    let [wordArray, setWordArray] = useState(new Array<string>());
    let [startDateInMilisseconds, setStartDateInMilisseconds] = useState(0);
    let [colorPickerIsActive, setColorPickerIsActive] = useState(false);

    useEffect(() => {
        const localStorageBackground: String | null = window.localStorage.getItem('tstbg');
        const localStorageForeground: String | null = window.localStorage.getItem('tstfg');
        
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordsPerMinute(0);
        referenceToInputElement.current?.focus();

        if (localStorageBackground) {
            setBackgroundColor(localStorageBackground.toString());
        }

        if (localStorageForeground) {
            setForegroundColor(localStorageForeground.toString());
        }
    }, []);

    useEffect(() => {
        if (referenceToChangeColorsText.current) {
            referenceToChangeColorsText.current.textContent = "";
            if (colorPickerIsActive) {
                referenceToChangeColorsText.current.textContent = "Close";
            } else {
                referenceToChangeColorsText.current.textContent = "Change Colors";
            }
        }
    }, [colorPickerIsActive])

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

    function resetComponentState(): void {
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordArrayIndex(typingInputInitialState.wordArrayIndex);
        setWordsPerMinute(typingInputInitialState.wordsPerMinute);

        foregroundElements?.forEach(span => span.style.color = foregroundColor ? foregroundColor : '#FFFFFF');

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
        ? colorToPutOnSpanElement = "#FF0000" 
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
                setColorPickerIsActive(true);
                referenceToColorPickerDiv.current.style.display = "block";
            } else {
                setColorPickerIsActive(false);
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
        const colorPickerDivArray: NodeListOf<HTMLDivElement> = document.querySelectorAll(".color-picker");
        colorPickerDivArray.forEach((el: HTMLDivElement) => { el.style.display = "none" });
    }

    function handleBackgroundColorChange(colorHex: string) {
        if (backgroundElements && backgroundElements.length > 0) {
            backgroundElements.forEach((element: HTMLDivElement) => element.style.background = colorHex);
            setBackgroundColor(colorHex);
            window.localStorage.setItem('tstbg', backgroundColor);
        }
    }

    function handleForegroundColorChange(colorHex: string) {
        if (foregroundElements && foregroundElements.length > 0) {
            foregroundElements.forEach((element: HTMLSpanElement) => element.style.color = colorHex);
            setForegroundColor(colorHex);
            window.localStorage.setItem('tstfg', foregroundColor);
        }
    }

    function handleColorReset() {
        window.localStorage.removeItem('tstbg');
        window.localStorage.removeItem('tstfg');

        setBackgroundColor("#000000");
        setForegroundColor("#FFFFFF");
        
        window.location.reload();
    }

    return (
        <>
            <div id="divMainInput">
                <button type="button" className={"change-color-buttons"} onClick={handleColorReset}>Reset Colors</button>
                <button type="button" className={"change-color change-color-buttons"} onClick={handleColorPickerClick}><span ref={referenceToChangeColorsText}>Change Colors</span></button>
                <div id="div-color-picker" ref={referenceToColorPickerDiv} style={{display: "none"}}>
                    <button type="button" className={"change-background change-color-buttons"} onClick={handleBackgroundColorPickerClick}>Background <span role="img" aria-label="paintbrush">🖌️</span></button>
                    <button type="button" className={"change-foreground change-color-buttons"} onClick={handleForegroundColorPickerClick}>Foreground <span role="img" aria-label="paintbrush">🖌️</span></button>
                </div>

                <div style={{display: 'none'}} ref={referenceToBackgroundColorPickerDiv} className={"color-picker"}>
                    <ChromePicker disableAlpha={true} color={backgroundColor} ref={referenceToBackgroundColorPicker} onChange={(color: ColorResult) => { handleBackgroundColorChange(color.hex) }} />
                </div>

                <div style={{display: 'none'}} ref={referenceToForegroundColorPickerDiv} className={"color-picker"}>
                    <ChromePicker disableAlpha={true} color={foregroundColor} ref={referenceToForegroundColorPicker} onChange={(color: ColorResult) => { handleForegroundColorChange(color.hex) }} />
                </div>

                <span id="span-reset-typing-input-state" onClick={resetComponentState}></span>
                <div id="divMainWords">
                    {wordArray.map((word, index) => (<span className={"foreground"} id={`${word}${index}`} key={index}>{word}&nbsp;</span>))}
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
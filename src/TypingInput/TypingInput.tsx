import './typingInput.css';
import Results from '../Results/Results';
import { HexColorPicker } from 'react-colorful';
import React, { useState, useEffect, useRef } from 'react';
import ITypingInputInitialState from '../Interfaces/ITypingInputInitialState';
import getSpecifiedNumberOfRandomWords from '../utils/getSpecifiedNumberOfRandomWords';

const typingInputInitialState: ITypingInputInitialState = {
    wordArrayIndex: 0,
    wordsPerMinute: 0,
    startDateInMilisseconds: 0
}

// current bug:
// 1 -> load the website for the first time with a different foreground color
// 2 -> click the reset button 
// current behavior  -> the foreground color does not change unless you click the reset button twice
// expected behavior -> the foreground color should have changed in the first click.
export default function TypingInput(): JSX.Element {
    const wordArraySize = 15;

    const defaultBackgroundColor = '#000000'; 
    const defaultForegroundColor = '#FFFFFF';

    // Refs to mutable elements inside component.
    const referenceToInputElement             = useRef<HTMLInputElement>(null);
    const referenceToColorPickerDiv           = useRef<HTMLDivElement>(null);
    const referenceToBackgroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToForegroundColorPickerDiv = useRef<HTMLDivElement>(null);
    const referenceToChangeColorsText         = useRef<HTMLSpanElement>(null);

    // State management
    let [wordArrayIndex, setWordArrayIndex]                       = useState(0);
    let [wordsPerMinute, setWordsPerMinute]                       = useState(0);
    let [foregroundColor, setForegroundColor]                     = useState('');
    let [backgroundColor, setBackgroundColor]                     = useState('');
    let [wordArray, setWordArray]                                 = useState(new Array<string>());
    let [startDateInMilisseconds, setStartDateInMilisseconds]     = useState(0);
    let [colorPickerIsActive, setColorPickerIsActive]             = useState(false);

    useEffect(() => {
        let localStorageForeground = localStorage.getItem('tstfg');
        let localStorageBackground = localStorage.getItem('tstbg');

        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordsPerMinute(0);

        referenceToInputElement.current?.focus();

        setForegroundColor(localStorageForeground ? localStorageForeground : defaultForegroundColor);
        setBackgroundColor(localStorageBackground ? localStorageBackground : defaultBackgroundColor);
    }, [])

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

    function resetComponentState(optionalForegroundColorHex?: string): void {
        setWordArray(getSpecifiedNumberOfRandomWords(wordArraySize));
        setWordArrayIndex(typingInputInitialState.wordArrayIndex);
        setWordsPerMinute(typingInputInitialState.wordsPerMinute);

        document.querySelectorAll<HTMLElement>('.foreground')?.forEach((element) => element.style.color = optionalForegroundColorHex ? optionalForegroundColorHex : foregroundColor );

        clearRefElementValue(referenceToInputElement);
        referenceToInputElement.current?.focus();
    }

    function clearRefElementValue(referenceToElement: React.RefObject<HTMLInputElement | null>): void {
        if (referenceToElement && referenceToElement.current)
            referenceToElement.current.value = '';
    }

    function checkInputValue(insertedWord: string | null): void {
        const currentWord = wordArray[wordArrayIndex];
        const currentSpanElement: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>(`#${currentWord}${wordArrayIndex}`);
        
        let colorToFillSpanElementWith = '';
        
        insertedWord !== currentWord ? colorToFillSpanElementWith = '#FF0000' : colorToFillSpanElementWith = '#1ED760';
        
        markWordElementAsTypedIfElementFound(currentSpanElement, colorToFillSpanElementWith);
        
        setWordArrayIndex(wordArrayIndex + 1);
    }

    function markWordElementAsTypedIfElementFound(wordElement: HTMLElement | null, color: string): void {
        if (wordElement)
            wordElement.style.color = color;
    }

    function handleColorPickerClick() {
        hideColorPickerDivs();

        if (referenceToChangeColorsText && referenceToChangeColorsText.current) {
            if (colorPickerIsActive) {
                setColorPickerIsActive(false);
                referenceToChangeColorsText.current.textContent = 'Change Colors';
            } else {
                setColorPickerIsActive(true);
                referenceToChangeColorsText.current.textContent = 'Close';
            }
        }

        if (referenceToColorPickerDiv.current) {
            if(referenceToColorPickerDiv.current?.style.display === 'none') {
                referenceToColorPickerDiv.current.style.display = 'block';
            } else {
                referenceToColorPickerDiv.current.style.display = 'none';
            }
        }
    }

    function handleBackgroundColorPickerClick() {
        hideColorPickerDivs();
        if (referenceToBackgroundColorPickerDiv.current) {
            if (referenceToBackgroundColorPickerDiv.current?.style.display === 'none') {
                referenceToBackgroundColorPickerDiv.current.style.display = 'block';
            } else {
                referenceToBackgroundColorPickerDiv.current.style.display = 'none';
            }
        }
    }

    function handleForegroundColorPickerClick() {
        hideColorPickerDivs();
        if (referenceToForegroundColorPickerDiv.current) {
            if (referenceToForegroundColorPickerDiv.current?.style.display === 'none') {
                referenceToForegroundColorPickerDiv.current.style.display = 'block';
            } else {
                referenceToForegroundColorPickerDiv.current.style.display = 'none';
            }
        }
    }

    function hideColorPickerDivs() {
        const colorPickerDivArray: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.color-picker');
        colorPickerDivArray.forEach((el: HTMLDivElement) => { el.style.display = 'none' });
    }

    function handleBackgroundColorChange(colorHex: string) {
        setBackgroundColor(colorHex);

        document.querySelectorAll<HTMLDivElement>('.background')?.forEach((element: HTMLDivElement) => element.style.background = colorHex);
        localStorage.setItem('tstbg', colorHex);
    }

    function handleForegroundColorChange(colorHex: string) {
        setForegroundColor(colorHex);

        document.querySelectorAll<HTMLElement>('.foreground')?.forEach((element: HTMLElement) => element.style.color = colorHex);
        localStorage.setItem('tstfg', colorHex);
    }

    function handleColorReset() {
        localStorage.removeItem('tstfg');
        localStorage.removeItem('tstbg');

        handleBackgroundColorChange(defaultBackgroundColor);
        handleForegroundColorChange(defaultForegroundColor);
        
        resetComponentState(defaultForegroundColor);
    }

    return (
        <>
            <div id='divMainInput'>
                <button type='button' className={'change-color-buttons'} onClick={handleColorReset}>Reset Colors</button>
                <button type='button' className={'change-color change-color-buttons'} onClick={handleColorPickerClick}><span ref={referenceToChangeColorsText}>Change Colors</span></button>
                <div id='div-color-picker' ref={referenceToColorPickerDiv} style={{display: 'none'}}>
                    <button type='button' className={'change-background change-color-buttons'} onClick={handleBackgroundColorPickerClick}>Background <span role='img' aria-label='paintbrush'>🖌️</span></button>
                    <button type='button' className={'change-foreground change-color-buttons'} onClick={handleForegroundColorPickerClick}>Foreground <span role='img' aria-label='paintbrush'>🖌️</span></button>
                </div>

                <div style={{display: 'none'}} ref={referenceToBackgroundColorPickerDiv} className={'color-picker'}>
                    <HexColorPicker color={backgroundColor} onChange={(color) => { handleBackgroundColorChange(color) }} />
                </div>

                <div style={{display: 'none'}} ref={referenceToForegroundColorPickerDiv} className={'color-picker'}>
                    <HexColorPicker color={foregroundColor} onChange={(color) => { handleForegroundColorChange(color) }} />
                </div>

                <span id='span-reset-typing-input-state' onClick={() => resetComponentState() }></span>
                <div id='divMainWords'>
                    {wordArray.map((word, index) => (<span className={'foreground'} id={`${word}${index}`} key={index}>{word}&nbsp;</span>))}
                </div>
                <div id='divWithLabelAndInput'>
                    <label htmlFor='mainInput'>Press esc to reset:</label>
                    <input
                        id='mainInput'
                        ref={referenceToInputElement}
                        type='text' autoComplete='off'
                        onKeyPress={(evt) => { handleKeyPress(evt); }}
                    />
                </div>
                <Results currentNumberOfWordsPerMinute={wordsPerMinute} />
            </div>
        </>
    )
}

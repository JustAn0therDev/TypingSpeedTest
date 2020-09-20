import React from 'react';
import './typingInput.css'

const TypingInput = () => {
    return (
        <>
            <div id="divMainInput">
                <div id="divMainWords">
                    <span>palavras</span>
                    {" "}
                    <span>geradas</span>
                    {" "}
                    <span>de</span>
                    {" "}
                    <span>forma</span>
                    {" "}
                    <span>dinamica</span>
                </div>
                <input 
                    type="text" 
                    placeholder="Start typing here!"
                    autoComplete="off"
                 />
            </div>
        </>
    )
}

export default TypingInput;
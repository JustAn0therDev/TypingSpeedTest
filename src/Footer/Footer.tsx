import './Footer.css';
import React from 'react';
import GitHubLogo from './github.svg';

export default function Footer(): JSX.Element {
    return (
        <footer>
            <a href="https://github.com/JustAn0therDev/TypingSpeedTest" 
            target="_blank" 
            rel="noopener noreferrer">GitHub:&nbsp;<img src={GitHubLogo} alt="Github Logo"></img></a>
        </footer>
    )
}
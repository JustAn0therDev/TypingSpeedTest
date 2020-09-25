import React from 'react';
import GitHubLogo from './github.svg';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <a href="https://github.com/JustAn0therDev/TypingSpeedTest" 
            target="_blank" 
            rel="noopener noreferrer">GitHub:&nbsp;<img src={GitHubLogo} alt="Github Logo"></img></a>
        </footer>
    )
}

export default Footer;
import { relative } from 'path';
import React from 'react';
import GitHubLogo from './github.svg';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer>
                <a href="https://github.com/JustAn0therDev" target="_blank">GitHub profile:&nbsp;<img src={GitHubLogo} alt="Github Logo"></img></a>
            </footer>
        </>
    )
}

export default Footer;
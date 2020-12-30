import './App.css';
import React from 'react';
import Footer from './Footer/Footer';
import TypingInput from './TypingInput/TypingInput';
import triggerHeaderAnimation from './utils/triggerHeaderAnimation';
import addEscEventListenerToWindow from './utils/addEscEventListenerToWindow';
import setLocalStorageColorsToOnLoad from './utils/setLocalStorageColorsToOnLoad';

export default function App() {
  triggerHeaderAnimation();
  addEscEventListenerToWindow();
  setLocalStorageColorsToOnLoad();

  return (
    <div className="App background">
      <header className="App-header background">
        <h3>Typing Speed Test<span id="header-pipe">|</span></h3>
      </header>

      <main>
        <TypingInput />
      </main>

      <Footer />
    </div>
  );
}
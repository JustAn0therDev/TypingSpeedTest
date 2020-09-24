import './App.css';
import React from 'react';
import Footer from './Footer/Footer';
import TypingInput from './TypingInput/TypingInput';
import triggerHeaderAnimation from './utils/triggerHeaderAnimation';

const App = () => {
  triggerHeaderAnimation();

  return (
    <div className="App">
      <header className="App-header">
        <h3>Typing Test<span id="header-pipe">|</span></h3>
      </header>

      <main>
        <TypingInput />
      </main>

      <Footer />
    </div>
  );
}

export default App;

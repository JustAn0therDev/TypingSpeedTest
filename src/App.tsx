import React from 'react';
import './App.css';
import TypingInput from './TypingInput/TypingInput';
import Footer from './Footer/Footer';
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

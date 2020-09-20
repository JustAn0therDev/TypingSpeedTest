import React from 'react';
import './App.css';
import TypingInput from './TypingInput/TypingInput';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Typing Speed Test</h3>
        <h5>Type as the words appear.</h5>
      </header>

      <main>
        <TypingInput />
      </main>

      <Footer />
    </div>
  );
}

export default App;

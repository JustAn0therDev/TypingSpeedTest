import React from 'react';
import './App.css';
import TypingInput from './TypingInput/TypingInput';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Typing Test</h3>
      </header>

      <main>
        <TypingInput />
      </main>

      <Footer />
    </div>
  );
}

export default App;

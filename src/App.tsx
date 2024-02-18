import React, { useEffect, useState } from 'react';

import './App.scss';
import { Board } from './components/Board';

function App() {
  const [mysteryWord, setMysteryWord] = useState<string>('')

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then(res => res.json())
      .then(word => setMysteryWord(word[0]))
  }, [setMysteryWord])

  return (
    <div className="App">
      {mysteryWord && <Board solution={mysteryWord}/>}
    </div>
  );
}

export default App;

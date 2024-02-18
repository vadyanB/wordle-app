import React, { useEffect, useState } from 'react';

import './App.scss';
import { Board } from './components/Board';

function App() {
  const [mysteryWord, setMysteryWord] = useState<string>('');
  const [reloadApp, setReloadApp] = useState<boolean>(true);

  useEffect(() => {
    if (reloadApp) {
      fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then(res => res.json())
        .then(word => {
          setReloadApp(false);
          setMysteryWord(word[0])
        })
    }
  }, [setMysteryWord, setReloadApp, reloadApp])

  return (
    <div className="App">
      {mysteryWord && <Board solution={mysteryWord} setReloadApp={setReloadApp}/>}
    </div>
  );
}

export default App;

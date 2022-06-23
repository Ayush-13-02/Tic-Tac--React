import React, { useState } from 'react';
import './App.css';
// import Changeturn from './Components/Changeturn';
import Draw_tic_tac from './Components/Draw_tic_tac';

function App() {
  const [turnX, setTurnX] = useState(true);
  const [player, setPlayer] = useState('X');
  const handleplayer = () => {
    if (player === 'X') {
      setPlayer('O');
    }
    else {
      setPlayer('X')
    }
  }
 
  return (
    <>
      {/* <Changeturn player = {player} handleplayer = {handleplayer}/> */}
      <Draw_tic_tac player = {player} handleplayer = {handleplayer}/>
    </>
  );
}

export default App;

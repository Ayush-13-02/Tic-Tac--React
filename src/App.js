import React, { useState } from 'react';
import './App.css';
// import Changeturn from './Components/Changeturn';
import Draw_tic_tac from './Components/Draw_tic_tac';

function App() {
  const [inc, setInc] = useState(true);
  const [player, setPlayer] = useState('X');
  const [countwinX, setCountwinX] = useState(0);
  const [countwinO, setCountwinO] = useState(0);
  const handleplayer = () => {
    if (player === 'X') {
      setPlayer('O');
    }
    else {
      setPlayer('X')
    }
  }
  const handleInc = () =>{
    setInc(!inc);
  }
  const handlewinX = () => {
    setCountwinX((prevX) => prevX + 1);
  }
  const handlewinO = () => {
    setCountwinO((prevO) => prevO + 1);
  }
  return (
    <>
      {/* <Changeturn player = {player} handleplayer = {handleplayer}/> */}
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <Draw_tic_tac player={player} handleplayer={handleplayer} handlewinO={handlewinO} handlewinX={handlewinX} inc = {inc} handleInc = {handleInc} />
        <div className='m-8'>
          <div className='m-2 p-2 border shadow-xl bg-red-700 rounded-lg text-white text-2xl'>PlayerX win : {countwinX}</div>
          <div className='m-2 p-2 border shadow-xl bg-orange-700 rounded-lg text-white text-2xl'>PlayerO win : {countwinO}</div>
        </div>
      </div>
    </>
  );
}

export default App;

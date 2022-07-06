import React, { useState } from 'react';
import './App.css';
import Changeturn from './Components/Changeturn';
import Draw_tic_tac from './Components/Draw_tic_tac';

function App() {
  const [inc, setInc] = useState(true);
  const [player, setPlayer] = useState('X');
  const [countwinX, setCountwinX] = useState(0);
  const [countwinO, setCountwinO] = useState(0);
  const [Comp, setComp] = useState(false);
  const handleplayer = () => {
    if (player === 'X') {
      setPlayer('O');
    }
    else {
      setPlayer('X')
    }
  }
  const handleInc = () => {
    setInc(!inc);
  }
  const handlewinX = () => {
    setCountwinX((prevX) => prevX + 1);
  }
  const handlewinO = () => {
    setCountwinO((prevO) => prevO + 1);
  }
  const HandleComp = ()=>{
    setPlayer('X');
    setComp(!Comp);
  }
  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-center bg-orange-200 h-screen'>
        {Comp ? <Changeturn player={player} handleplayer={handleplayer} handlewinO={handlewinO} handlewinX={handlewinX} inc={inc} handleInc={handleInc} /> :
          <Draw_tic_tac player={player} handleplayer={handleplayer} handlewinO={handlewinO} handlewinX={handlewinX} inc={inc} handleInc={handleInc} />}
        <div className='m-8'>
          <div className='m-2 p-2 border shadow-xl rounded bg-red-600 duration-200 text-white text-2xl'>PlayerX win : {countwinX}</div>
          <div className='m-2 p-2 border shadow-xl rounded bg-orange-600 duration-200 text-white text-2xl'>PlayerO win : {countwinO}</div>
          <div className='flex flex-col'>
            <h1 className='m-2 mt-4 text-2xl font-semibold'>Played With</h1>
            {Comp ? <div className='flex'><button className='m-2 border border-green-600 p-2 text-lg font-medium hover:shadow-2xl hover:shadow-red-700 duration-500' disabled>Computer</button><button className='m-2 border border-red-600 p-2 text-lg font-medium hover:shadow-2xl hover:shadow-red-700 duration-500' onClick={ HandleComp }>Human</button></div> :
              <div className='flex'><button className='m-2 border border-red-600 p-2 text-lg font-medium hover:shadow-2xl hover:shadow-red-800 duration-500' onClick={ HandleComp }>Computer</button><button className='m-2 border border-green-600 p-2 text-lg font-medium hover:shadow-2xl hover:shadow-green-800 duration-500' disabled>Human</button></div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

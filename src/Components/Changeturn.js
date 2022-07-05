import React, { useEffect, useState } from 'react'

function Changeturn({ player, handleplayer, handlewinO, handlewinX, inc, handleInc }) {
  const [record, setRecord] = useState([
    null, null, null, null, null, null, null, null, null
  ]);

  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])
  const updatematrix = (i, j, value) => {
    let copy = [...matrix];
    copy[i][j] = value;
    setMatrix(copy);
  }
  const equal3 = (a, b, c) => {
    if (a === b && b === c && c !== null) return true;
    return false;
  }
  const [winM, setWinM] = useState(null);
  const human = 'X';
  const ai = 'O';

  const ChexkResult = (isMax) => {
    if (equal3(matrix[0][0], matrix[0][1], matrix[0][2])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[1][0], matrix[1][1], matrix[1][2])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[2][0], matrix[2][1], matrix[2][2])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[0][0], matrix[1][0], matrix[2][0])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[0][1], matrix[1][1], matrix[2][1])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[0][2], matrix[1][2], matrix[2][2])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[0][0], matrix[1][1], matrix[2][2])) {
      if (isMax) return -1;
      else return 1;
    }
    else if (equal3(matrix[0][2], matrix[1][1], matrix[2][0])) {
      if (isMax) return -1;
      else return 1;
    }
    else {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (matrix[i][j] === null) return null
        }
      }
      return 0;
    }
  }

  const minmax = (depth, isMaximising) => {
    let result = ChexkResult(isMaximising);
    if (result !== null) {
      return result;
    }
    if (isMaximising) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (matrix[i][j] === null) {
            updatematrix(i, j, ai);
            let score = minmax(depth + 1, false);
            updatematrix(i, j, null);
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (matrix[i][j] === null) {
            updatematrix(i, j, human);
            let score = minmax(depth + 1, true);
            updatematrix(i, j, null);
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  const bestMove = () => {
    let bestScore = -Infinity;
    let bestmove = { x: null, y: null };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === null) {
          updatematrix(i, j, ai);
          let score = minmax(0, false);
          updatematrix(i, j, null);
          // bestScore = Math.max(score, bestScore);
          if (score > bestScore) {
            bestScore = score;
            bestmove.x = i;
            bestmove.y = j;
          }
        }
      }
    }
    if (player === 'O') {
      updatematrix(bestmove.x, bestmove.y, ai);
    }
    handleplayer();
  }
  const updaterecord = () => {
    let list = [];
    for (let i = 0; i < 9; i++) {
      if (i < 3) {
        list[i] = matrix[0][i];
      }
      else if (i < 6) {
        list[i] = matrix[1][i - 3];
      }
      else {
        list[i] = matrix[2][i - 6];
      }
    }
    setRecord(list);
  }

  const handleclick = (id) => {
    { id < 3 ? updatematrix(0, id, human) : (id < 6 && id > 2) ? matrix[1][id - 3] = 'X' : matrix[2][id - 6] = 'X' }
    setRecord(Element => {
      return Element.map((item, j) => {
        return j === id ? (item === null ? player : item) : item
      })
    })
    handleplayer();
  }
  const Restartgame = ()=>{
    setRecord(Element => {
        return Element.map(() => {
            // console.log(j === id ? (item === 'Y' ? player : item): item)
            return null;
        })
    })
    let mat = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    setMatrix(mat);
    if(player === 'O') handleplayer();
    handleInc();
    setWinM(null);
}
  useEffect(() => {
    const interval = setInterval(() => {
      if (player === 'O' && winM == null) {
        bestMove();
        updaterecord();
        // handleplayer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player, bestMove, updaterecord,winM]);
  useEffect(() => {
    const checkwin = () => {
      let ans = false;
      for (let i = 0; i < 9; i += 3) {
        ans |= (record[i] === record[i + 1] && record[i + 1] === record[i + 2] && record[i] !== null);
      }
      for (let i = 0; i < 9; i++) {
        ans |= (record[i] === record[i + 3] && record[i + 3] === record[i + 6] && record[i] !== null);
      }
      ans |= ((record[0] === record[4] && record[4] === record[8] && record[0] !== null) || (record[2] === record[4] && record[4] === record[6] && record[6] !== null));

      return ans;
    }
    const checkdraw = () => {
      let count = 0;
      for (let i = 0; i < 9; i++) {
        if (record[i] !== null)
          count++;
      }
      return count === 9;
    }
    if (checkwin()) {
      if (player === 'X') {
        if (inc) {
          handlewinO();
          handleInc();
        }
        setWinM('Player O win');
      }
      else {
        if (inc) {
          handlewinX();
          handleInc();
        }
        setWinM('Player X win');
      }
    }
    else if (checkdraw()) {
      setWinM('Game Draw');
      if (inc)
        handleInc();
    }
  }, [record,handleInc,handlewinO,handlewinX,inc,player,winM])

  return (
    <>
      <div className='relative flex flex-col my-2 justify-center items-center md:my-32 sm:mx-12'>
      <h1 className='m-4 shadow-2xl bg-blue-100 p-2 rounded-lg text-6xl text-center font-serif font-semibold bg-gradient-to-tr text-blue-800 animate-bounce'>Tic Tac Toe</h1>
        <div className="grid grid-cols-3 w-96 gap-1" style={winM ? { opacity: "0.3" } : null}>
          {record.map((record, index) => (
            <div key={index} className="border shadow-lg rounded-lg h-32 w-32 bg-gray-500 flex justify-content items-center hover:bg-gray-400 cursor-pointer" onClick={() => handleclick(index)} style={record === 'X' ? { backgroundColor: "red" } : record === 'O' ? { backgroundColor: "rgb(255, 68, 0)" } : null}>
              <span className='text-[5rem] font-semibold items-center text-gray-500 w-full text-center hover:text-white hover:block'>{record === 'X' ? 'X' : record === 'O' ? 'O' : player}</span>
            </div>
          )
          )}
        </div>
        {winM!==null ? <div className="flex flex-col absolute z-10 items-center justify-center text-center h-full bg-slate-200 text-black w-96 opacity-40">
          <span className='text-3xl font-bold opacity-100'>{winM}</span>
          <button className='bg-gray-800 p-2 m-2 text-lg rounded shadow-lg text-white' onClick={Restartgame}>Restart</button>
        </div> : null}
      </div>
    </>
  )
}

export default Changeturn
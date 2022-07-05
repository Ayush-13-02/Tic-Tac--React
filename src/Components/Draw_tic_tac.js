import React, { useEffect, useState } from 'react'

function Draw_tic_tac({ player, handleplayer, handlewinO, handlewinX, inc, handleInc }) {
    const [record, setRecord] = useState([
        'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'
    ]);
    const [winM, setWinM] = useState('')
    const handleclick = (id) => {
        // console.log(record,id);
        setRecord(Element => {
            return Element.map((item, j) => {
                // console.log(j === id ? (item === 'Y' ? player : item): item)
                return j === id ? (item === 'Y' ? player : item) : item
            })
        })
        if (record[id] === 'Y')
            handleplayer();
    }
    const Restartgame = ()=>{
        setRecord(Element => {
            return Element.map(() => {
                // console.log(j === id ? (item === 'Y' ? player : item): item)
                return 'Y';
            })
        })
        setWinM('');
        if(player === 'O')
        handleplayer();
        handleInc();
    }
    useEffect(() => {
        const checkwin = () => {
            let ans = false;
            for (let i = 0; i < 9; i += 3) {
                ans |= (record[i] === record[i + 1] && record[i + 1] === record[i + 2] && record[i] !== 'Y');
            }
            for (let i = 0; i < 9; i++) {
                ans |= (record[i] === record[i + 3] && record[i + 3] === record[i + 6] && record[i] !== 'Y');
            }
            ans |= ((record[0] === record[4] && record[4] === record[8] && record[0] !== 'Y') || (record[2] === record[4] && record[4] === record[6] && record[6] !== 'Y'));

            return ans;
        }
        const checkdraw = () => {
            let count = 0;
            for (let i = 0; i < 9; i++) {
                if (record[i] !== 'Y')
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
            if(inc)
            handleInc();
        }
    },[record,handleInc,handlewinO,handlewinX,inc,player,winM])

    return (
        <>
            <div className='relative flex flex-col my-2 justify-center items-center md:my-16 sm:mx-12'>
                <h1 className='m-4 shadow-2xl bg-blue-100 p-2 rounded-lg text-6xl text-center font-serif font-semibold bg-gradient-to-tr text-blue-800 animate-bounce'>Tic Tac Toe</h1>
                <div className="grid grid-cols-3 w-96 gap-1" style={winM ? { opacity: "0.3" } : null}>
                    {record.map((record, index) => (
                        <div key={index} className="border shadow-xl rounded-lg h-28 w-28 m-[2px] bg-gray-500 flex justify-content items-center hover:bg-gray-400 hover:p-2 cursor-pointer" onClick={() => handleclick(index)} style={record === 'X' ? { backgroundColor: "red" } : record === 'O' ? { backgroundColor: "rgb(255, 68, 0)" } : null}>
                            <span className='text-[5rem] font-semibold items-center select-none text-gray-500 w-full text-center hover:text-white hover:block '>{record === 'X' ? 'X' : record === 'O' ? 'O' : player}</span>
                        </div>
                    )
                    )}
                </div>
                {winM ? <div className="flex flex-col absolute z-10 items-center justify-center text-center h-full bg-slate-200 text-black w-96 opacity-40">
                    <span className='text-3xl font-bold opacity-100'>{winM}</span>
                    <button className='bg-red-800 p-2 m-2 text-lg rounded shadow-lg text-white' onClick={Restartgame}>Restart</button>
                </div> : null}
            </div>
        </>
    )
}

export default Draw_tic_tac

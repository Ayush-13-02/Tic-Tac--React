import React, { useEffect, useState } from 'react'

function Draw_tic_tac({ player, handleplayer }) {
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
        handleplayer();
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
            ans |= ((record[0] === record[4] && record[4] === record[8] && record[0] !== 'Y') || (record[3] === record[4] && record[4] === record[6] && record[6] !== 'Y'));

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
            if (player === 'X')
                setWinM('Player O win');
            else
                setWinM('Player X win');
        }
        if (checkdraw()) {
            setWinM('Game Draw');
        }
        console.log(winM);
    })

    return (
        <>
            <div className='relative flex my-2 justify-center items-center md:my-32 sm:mx-12'>
                <div className="grid grid-cols-3 w-96 gap-1"style={winM?{opacity:"0.3"}:null}>
                    {record.map((record, index) => (
                        <div key={index} className="border shadow-lg rounded-lg h-32 w-32 bg-gray-500 flex justify-content items-center hover:bg-gray-400 cursor-pointer" onClick={() => handleclick(index)} style={record === 'X' ? { backgroundColor: "red" } : record === 'O' ? { backgroundColor: "rgb(255, 68, 0)" } : null}>
                            <span className='text-[5rem] font-semibold items-center text-gray-500 w-full text-center hover:text-white hover:block'>{record === 'X' ? 'X' : record === 'O' ? 'O' : player}</span>
                        </div>
                    )
                    )}
                </div>
                {winM ? <div className="flex flex-col absolute z-10 items-center justify-center text-center h-full bg-slate-200 text-black w-96 opacity-40">
                <span className='text-3xl font-bold opacity-100'>{winM}</span>
                <a href="./Draw_tic_tac.js"><button className='bg-gray-800 p-2 m-2 text-lg rounded shadow-lg text-white'>Restart</button></a>
            </div> : null}
            </div>
        </>
    )
}

export default Draw_tic_tac

import { React, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// API
import * as apiGame from '../api/game'
import * as apiUser from '../api/user'

const ResultModal = ({score, highestCombo}) => {

      const [scorePlayer, setScorePlayer] = useState();
      const [comboPlayer, setComboPlayer] = useState();

      const [scoreGame, setScoreGame] = useState();
      const [comboGame, setComboGame] = useState();
    
      const userAccount = parseInt(localStorage.getItem("userAccount"));
          
      const hasRun = useRef(false);

      // Backend => API getInfoUser
      const getInfoUser = async (id) => {
        const data = await apiUser.getInfoUser(id);
        if (data.data.success) {
          setScorePlayer(data.data.data.highestScore);
          setComboPlayer(data.data.data.highestCombo);
          console.log(true);
          
        }
      }

      useEffect(() => {
      if (scoreGame > scorePlayer) {
        editScore(userAccount, scoreGame);
      }
    },[scoreGame])

    useEffect(() => {
      if (comboGame > comboPlayer) {
        editCombo(userAccount, comboGame);
      }
    },[comboGame])
    
    // Backend => API editScore
    const editScore = async (id, score) => {
      await apiUser.editScore(id, score)
    }

    // Backend => API editCombo
    const editCombo = async (id, combo) => {
      await apiUser.editCombo(id, combo)
    }

    // Backend => API createGame
    const createGame = async (day, month, year, score, highestCombo, userId) => {
      const data = await apiGame.createGame(day, month, year, score, highestCombo, userId);
      if (data.data.success) {
        setScoreGame(data.data.data.score);
        setComboGame(data.data.data.combo); 
      }
    }
useEffect(() => {
  if (hasRun.current) return;
  hasRun.current = true;

  const date = new Date();
  createGame(date.getDate(), date.getMonth() + 1, date.getFullYear(), score, highestCombo, userAccount);
  getInfoUser(userAccount);
  console.log(0);
}, []);

    const navigate = useNavigate()
  return (
    <>
    <div className='fixed inset-0 z-40 bg-[rgba(0,0,0,0.50)] flex justify-center items-center'>
          <div className='flex justify-center'>
              <div className='bg-black w-100 p-5 rounded-lg border-2 border-[#FF00C8] flex flex-col items-center'>
                <h1 className='text-[30px] font-bold'>Your score</h1>
                <p className='text-[24px] font-bold my-3'>{score}</p>
                <p className='text-[24px] font-bold'>Highest combo</p>
                <p className='text-[24px] font-bold my-3'>{highestCombo}</p>
                <button onClick={() => {navigate(0)}} className=' text-[24px] text-white font-bold mt-10 w-[50%] h-16 bg-gradient-to-b from-[#FF00C8] to-[#990078] rounded-xl hover:border-2 cursor-pointer hover:bg-black hover:bg-none hover:border-[#FF00C8]'>Play again</button>
                <button onClick={() => {navigate("/home")}} className=' text-[24px] text-white font-bold  my-3 w-[75%] h-16 bg-gradient-to-b from-[#FF00C8] to-[#990078] rounded-xl hover:border-2 cursor-pointer hover:bg-black hover:bg-none hover:border-[#FF00C8]'>Back to main menu</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default ResultModal
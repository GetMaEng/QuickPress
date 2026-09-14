
import { React, useState, useEffect } from 'react';
import GifBG from '../images/NeonPinkGrid.gif';
import { useNavigate } from 'react-router-dom';
import * as apiUser from "../api/user";

export default function TopScorePage() {
const navigate = useNavigate();

    const userAccount = parseInt(localStorage.getItem("userAccount"));

    const [players, setPlayers] = useState([]);

    // Backend => API getAllInfoUser
    const getAllInfoUser = async (id) => {
        const data = await apiUser.getAllInfoUser(id);
        if (data.data.success) {
            setPlayers(data.data.data);
        }
    }

    useEffect(() => {
        getAllInfoUser(userAccount);
    }, [])

    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
    if (players.length > 0) {
        const sortedPlayers = [...players]
        .sort((a, b) => b.highestScore - a.highestScore)
        .slice(0, 5);
        setTopPlayers(sortedPlayers);
        console.log(sortedPlayers);
        
    }
    }, [players]);
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-white flex flex-col lg:gap-5 items-center justify-center"
      style={{
        backgroundImage: `url(${GifBG})`,
      }}
    >
        <div className='flex flex-col h-100 lg:h-150'>
        <div >
            <h1 className="text-5xl text-center mb-10 ">Top Score</h1>
            <table className="table-auto w-full items-center text-center border-separate border-spacing-0">
                <thead>
                    <tr className="text-[12px] lg:text-[40px]">
                        <th className="lg:border-b-3 border-r-2 border-b-2 lg:text-2xl border-white px-4 py-2">Rank</th>
                        <th className="lg:border-b-3 border-r-2 border-b-2 lg:text-2xl border-l-2 border-white  px-4 py-2">Username</th>
                        <th className="lg:border-b-3 border-l-2 border-b-2 lg:text-2xl border-white lg:px-4 lg:py-2">Score</th>
                    </tr>
                </thead>
                {topPlayers.map((player, index) => (
                <tbody>
                    <tr className='text-[12px] lg:text-[30px]'>
                        <td className="border-r-2 border-t border-white px-4 py-2">{index + 1}</td>
                        <td className="border-r-2 border-t border-l-2 border-white px-4 py-2">{player.username}</td>
                        <td className="border-t border-l-2 px-4 py-2">{player.highestScore}</td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>

        <div className='flex w-[370px] mt-16 lg:w-[1000px] items-center justify-center'>
            <button onClick={() => {navigate("/home")}} className='
                text-[16px] lg:text-[32px] font-bold 
                bg-black hover:bg-gradient-to-b 
                from-[#FC0FC0] to-[#C154C1]
                px-15 lg:px-15 py-3
                rounded-xl border-2 border-[#FC0FC0] shadow-[-6px_10px_rgba(255,0,255,1)]
                cursor-pointer'>
                Back
            </button>
        </div>
        </div>
    </div>
  );
}
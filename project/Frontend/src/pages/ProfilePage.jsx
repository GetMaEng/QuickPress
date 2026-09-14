import { React, useState, useEffect } from 'react'
import GifBG from '../images/NeonPinkGrid.gif';
import { useNavigate } from "react-router-dom";
// API
import * as apiUser from "../api/user.js"
import * as apiGame from "../api/game.js"

export default function ProfilePage() {

    const [username, setUsername] = useState()
    const [games, setGames] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editUsername, setEditUsername] = useState()

    const userAccount = parseInt(localStorage.getItem("userAccount"));

    // Backend => API getInfoUser
    const getInfoUser = async (id) => {
        const data = await apiUser.getInfoUser(id);
        if (data.data.success) {
            setUsername(data.data.data.username);
        }
    }

    // Backend => API getAllGame
    const getAllGame = async (userId) => {
        const data = await apiGame.getAllGame(userId);
        if (data.data.success) {
            setGames(data.data.data);
        }
    }

    // Backend => API deleteGame
    const deleteGame = async (id) => {
        await apiGame.deleteGame(id);
    }

    // Backend => API editUsername
    const editName = async (id, username) => {
        await apiUser.editUsername(id, username);
        setEdit(false);
    }

    useEffect(() => {
        getInfoUser(userAccount);
        getAllGame(userAccount);        
    },[games])

    useEffect(() => {
        setEditUsername(username)   ;
    },[username])

    // Current page start with 1
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 5;

    // Calculate Total page (Math.ceil ex: 0.95 => 1)
    const totalPages = Math.ceil(games.length / gamesPerPage);
    // Start page (ex: (1 - 1) * 5 = 0
    //                 (2 - 1) * 5 = 5)
    const start = (currentPage - 1) * gamesPerPage;
    // CurrentPosts in this page (ex: posts.slice(0, 0 + 5) = (0, 5) => 0 1 2 3 4
    //                                posts.slice(5, 5 + 5) = (5, 10) => 5 6 7 8 9)
    const currentGames = games.slice(start, start + gamesPerPage);

    // Go to the page that user click
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    const navigate = new useNavigate();
  return (
    <div
      className="lg:w-full h-[884px] lg:min-h-screen bg-cover bg-center text-white flex flex-col gap-8 lg:gap-5 items-center justify-center"
      style={{
        backgroundImage: `url(${GifBG})`, 
      }}
    >
        <div className='flex flex-col items-center justify-center w-[360px] h-[600px] lg:w-[800px] lg:h-[600px] bg-black border-2 border-[#FC0FC0] rounded-xl p-2 lg:p-10'>
            <div className='flex mt-5 lg:gap-130 gap-30  '>
                {!edit && <h1 className='flex text-[20px] lg:text-[30px] font-bold'>
                    {username}
                </h1>}
                {edit && <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className='border-1 border-white rounded-lg px-2 text-[20px]'/>}
                {!edit && <button onClick={() => setEdit(true)} className='flex item-center justify-center w-14 h-7 mt-2 text-[15px] lg:w-20 lg:h-10 lg:text-[20px] font-bold rounded-xl bg-gradient-to-b from-[#FC0FC0] to-[#C154C1] hover:bg-none hover:bg-black hover:border-2 hover:border-[#FC0FC0] cursor-pointer'>
                    Edit
                </button>}
                {edit && <div className='flex -ml-60 gap-5'>
                    <button onClick={() => setEdit(false)} className='flex item-center justify-center w-14 h-7 text-[15px] lg:w-20 lg:h-10 lg:text-[20px] font-bold rounded-xl bg-gradient-to-b from-[#FC0FC0] to-[#C154C1] hover:bg-none hover:bg-black hover:border-2 hover:border-[#FC0FC0] cursor-pointer'>
                        Cancel
                    </button>
                    <button onClick={() => editName(userAccount, editUsername)} className='flex item-center justify-center w-14 h-7 text-[15px] lg:w-20 lg:h-10 lg:text-[20px] font-bold rounded-xl bg-gradient-to-b from-[#FC0FC0] to-[#C154C1] hover:bg-none hover:bg-black hover:border-2 hover:border-[#FC0FC0] cursor-pointer'>
                        Save
                    </button>
                </div>}
            </div>

        <div className='flex flex-col mb-5 w-[320px] h-full lg:w-[750px] bg-black mt-3 lg:mt-5 border-2 border-[#FC0FC0] rounded-xl p-2 lg:p-6 justify-between'>
            <div>
                <h2 className='text-[20px] lg:text-[30px] font-bold underline text-center mb-3'>History</h2>
                <table className="table-auto w-full text-center border-separate border-spacing-0">
                    <thead>
                        <tr className="text-[12px] lg:text-[20px]">
                            <th className="border-b border-r border-white px-4 py-2">Date</th>
                            <th className="border-b border-r border-white px-4 py-2">Highest combo</th>
                            <th className="border-b border-white lg:px-4 py-2">Score</th>
                        </tr>
                    </thead>
                    {currentGames.map((game, index) => (
                    <tbody>
                        <tr className='text-[12px] lg:text-[20px]'>
                            <td className="border-r border-white px-4 py-2">{game.day}/{game.month}/{game.year}</td>
                            <td className="border-r border-white px-4 py-2">{game.combo}</td>
                            <td className="px-4 py-2">{game.score}</td>
                        <td className="px-4 py-2">
                            <button onClick={() => deleteGame(game.id)} className="w-13 lg:w-16 h-5 lg:h-8 text-[12px] lg:text-[15px] font-bold rounded-xl bg-gradient-to-b from-[#FC0FC0] to-[#C154C1] cursor-pointer">
                            Delete
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    ))}
                </table>
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center mb-3 gap-4 lg:gap-2 mt-6 ">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                        currentPage === i + 1 ? 'bg-gradient-to-b from-[#FC0FC0] to-[#C154C1] text-white font-bold' : ''
                    }`}
                    onClick={() => goToPage(i + 1)}
                    >
                    {i + 1}
                    </button>
                ))}

                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            </div>
        </div>

        <div className='flex lg:w-[900px]'>
            <button onClick={() =>{navigate("/home")}} className='
                text-[16px] lg:text-[32px] font-bold 
                bg-black hover:bg-gradient-to-b 
                from-[#FC0FC0] to-[#C154C1]
                px-7 lg:px-15 py-3
                rounded-xl border-2 border-[#FC0FC0] shadow-[-6px_10px_rgba(255,0,255,1)]
                cursor-pointer'>
                Back
            </button>

        </div>
    </div>
  );
} 

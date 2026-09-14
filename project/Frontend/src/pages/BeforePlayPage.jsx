import { React , useState , useEffect } from 'react'
import { NavLink } from "react-router-dom";
import GifBG from '../images/NeonPinkGrid.gif';
import * as apiUser from "../api/user"

const BeforePlayPage = () => {
    useEffect(() => {
      document.title = "QuickPress - Home"; // 🔧 Set dynamic title
    }, []);
  const [score, setScore] = useState();
  const [combo, setCombo] = useState();

  const userAccount = parseInt(localStorage.getItem("userAccount"));

  // Backend => API
  const getInfoUser = async (id) => {
    const data = await apiUser.getInfoUser(id);
    if (data.data.success) {
      setScore(data.data.data.highestScore);
      setCombo(data.data.data.highestCombo);
    }
  }

  useEffect(() => {
    getInfoUser(userAccount);
  }, [])

  return (
    <>
    <div
    className="w-full min-h-screen bg-cover bg-center text-white"
    style={{
    backgroundImage: `url(${GifBG})`,
    }}
    >   <div className='flex flex-col gap-20 lg:gap-35'>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-around items-center mt-15 gap-10 w-100 h-90 p-5 bg-black border-2 border-[#FF00C8] rounded-xl'>
                    <h1 className='text-[36px] font-bold'>Highest scores</h1>
                    <p className='text-[30px] font-bold'>{score}</p>
                    <p className='text-[30px] font-bold'>Highest combo: {combo}</p>
                </div>
            </div>
            <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-20 w-full lg:w-[95%] lg:mx-10'>
                <button className=' text-[30px] h-16 font-bold bg-black hover:bg-gradient-to-b from-[#FF00C8] to-[#990078] rounded-xl border-2 border-[#FF00C8] shadow-[-6px_10px_rgba(255,0,200,1)] cursor-pointer'><NavLink to={"/home"} className="px-28">Back</NavLink></button>
                <button className=' text-[30px] h-16 font-bold bg-gradient-to-b from-[#FF00C8] to-[#990078] rounded-xl hover:border-2 cursor-pointer hover:bg-black hover:bg-none hover:border-[#FF00C8]'><NavLink to={"/gameplay"} className="px-24">Let's GO!</NavLink></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default BeforePlayPage
import React from 'react';
import GifBG from '../images/NeonPinkGrid.gif';
import QuickPress from '../images/QuickPress.png';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {

    useEffect(() => {
    document.title = "QuickPress - Home"; // 🔧 Set dynamic title
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${GifBG})` }}
    >
      <div className="flex flex-col items-center 
                      gap-30 lg:gap-50 lg:flex-row-reverse lg:justify-between lg:items-center lg:w-full lg:max-w-5xl lg:px-10">
        <h1 className="max-sm:mb-4 lg:mt-25">
          <img src={QuickPress} alt="Quick Press Logo" className="w-[1200px] h-[280px] max-sm:w-[400px] max-sm:h-[230px]" />
        </h1><div className='flex flex-col gap-15'>
            <NavLink to={"/readyScreen"} >
                <button 
                    className="text-[30px] font-bold 
                                bg-black hover:bg-gradient-to-b 
                                from-[#FF00C8] to-[#990078]
                                px-4 w-70 h-16 rounded-xl border-2 border-[#FF00C8] shadow-[-8px_14px_4px_rgba(255,0,200,0.75)]
                                cursor-pointer
                                max-sm:text-[32px] max-sm:px-10 max-sm:py-2"
                                >
                        Play
                </button>  
            </NavLink>
            <NavLink to={"/topScores"} >
                <button 
                    className="text-[30px] font-bold 
                                bg-black hover:bg-gradient-to-b 
                                from-[#FF00C8] to-[#990078]
                                px-4 w-70 h-16 rounded-xl border-2 border-[#FF00C8] shadow-[-8px_14px_4px_rgba(255,0,200,0.75)]
                                cursor-pointer
                                max-sm:text-[32px] max-sm:px-10 max-sm:py-2"
                                >
                        Top Scores
                </button>  
            </NavLink>
            <NavLink to={"/profile"} >
                <button 
                    className="text-[30px] font-bold 
                                bg-black hover:bg-gradient-to-b 
                                from-[#FF00C8] to-[#990078]
                                px-4 w-70 h-16 rounded-xl border-2 border-[#FF00C8] shadow-[-8px_14px_4px_rgba(255,0,200,0.75)]
                                cursor-pointer
                                max-sm:text-[32px] max-sm:px-10 max-sm:py-2"
                                >
                        Profile
                </button>  
            </NavLink>
            <NavLink to={"/"} >
                <button
                    className="fixed right-5 bottom-5 lg:right-15 lg:bottom-15 text-[20px] font-bold 
                                bg-black hover:bg-gradient-to-b 
                                from-[#FF00C8] to-[#990078]
                                px-4 w-30 h-13 rounded-xl border-2 border-[#FF00C8]
                                cursor-pointer max-sm:px-5 max-sm:py-2"
                                >
                        Log out
                </button>  
            </NavLink>
        </div>
      </div>
    </div>
  );
}
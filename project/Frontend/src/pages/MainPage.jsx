import React from 'react';
import GifBG from '../images/NeonPinkGrid.gif';
import QuickPress from '../images/QuickPress.png';
import { NavLink } from 'react-router-dom';


export default function MainPage() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${GifBG})` }}
    >
      <div className="flex flex-col items-center 
                      gap-20 lg:gap-50 lg:flex-row-reverse lg:justify-between lg:items-center lg:w-full lg:max-w-5xl lg:px-10">
        <h1 className="max-sm:mb-4 lg:mt-25">
          <img src={QuickPress} alt="Quick Press Logo" className="w-[1200px] h-[280px] max-sm:w-[400px] max-sm:h-[230px]" />
        </h1>
        <NavLink to={"/login"} >
          <button 
            className="text-[30px] font-bold 
                      bg-black hover:bg-gradient-to-b 
                      from-[#FF00C8] to-[#990078]
                      px-28 h-16 rounded-xl border-2 border-[#FF00C8] shadow-[-8px_14px_4px_rgba(255,0,200,0.75)]
                      cursor-pointer
                      max-sm:text-[32px] max-sm:px-10 max-sm:py-2"
                      >
                      Login
          </button>
        </NavLink>
      </div>
    </div>
  );
}
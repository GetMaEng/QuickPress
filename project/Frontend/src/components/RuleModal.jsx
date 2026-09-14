import { React, useState} from 'react'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export let sendStart = false;
export function setSendStart(start){
    sendStart = start;
}

const RuleModal = ({rule, setShowRuleModal}) => {

  return (
    <>
      <div className='fixed inset-0 z-40 bg-[rgba(0,0,0,0.50)]'>
        <div className='flex justify-center items-center mt-20'>
          <div className='flex justify-center'>
              <div className='bg-black w-175 p-5 pb-10 rounded-lg border-2 border-[#FF00C8] max-sm:w-[100%]'>
                <h1 className='text-[36px] text-white font-bold text-center max-sm:text-[24px]'>Rule</h1>
                <p className='text-[24px] text-white font-semibold text-center my-5 max-sm:text-[16px]'>Show</p>
                <div className='flex justify-center gap-3'>
                  <FaArrowUp className='text-white text-[64px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-3 rounded-full max-sm:text-[48px]'/>
                  <FaArrowDown className='text-white text-[64px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-3 rounded-full max-sm:text-[48px]'/>
                  <FaArrowLeft className='text-white text-[64px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-3 rounded-full max-sm:text-[48px]'/>
                  <FaArrowRight className='text-white text-[64px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-3 rounded-full max-sm:text-[48px]'/>
                </div>
                <div className='flex justify-center'>
                  <hr className='border-white border-2 my-5 w-100 max-sm:w-[100%]'/>
                </div>
                <p className='text-[24px] text-white font-semibold text-center mb-5 max-sm:text-[16px]'>Press</p>
                <div className='flex justify-center gap-3'>
                  {rule.map((arrow, index) => (
                    <>
                    {arrow === "ArrowUp" && <FaArrowUp className='text-white text-[64px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-3 rounded-full max-sm:text-[48px]'/>}
                    {arrow === "ArrowDown" && <FaArrowDown className='text-white text-[64px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-3 rounded-full max-sm:text-[48px]'/>}
                    {arrow === "ArrowLeft" && <FaArrowLeft className='text-white text-[64px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-3 rounded-full max-sm:text-[48px]'/>}
                    {arrow === "ArrowRight" && <FaArrowRight className='text-white text-[64px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-3 rounded-full max-sm:text-[48px]'/>}
                    </>
                  ))}
                </div>
              </div>
          </div>
        </div>
        <div className='flex justify-end mt-20 max-sm:justify-center'>
          <button onClick={() => {setShowRuleModal(false); setSendStart(true);}} className=' text-[30px] text-white mr-20 font-bold px-24 h-16 bg-gradient-to-b from-[#FF00C8] to-[#990078] rounded-xl hover:border-2 cursor-pointer hover:bg-black hover:bg-none hover:border-1 hover:border-[#FF00C8] max-sm:text-[24px] max-sm:h-12 max-sm:text-[16px] max-sm:mr-0'>Start</button>
        </div>
    </div>
    </>
  )
}

export default RuleModal
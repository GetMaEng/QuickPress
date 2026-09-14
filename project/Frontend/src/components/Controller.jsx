import { useEffect, useState } from 'react';
import { sendRule } from '../pages/GamePlayPage';
import ResultModal from './ResultModal';
// Icon
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function ArrowSequenceGame({showRuleModal, rule, setRule, start, showResult}) {

  const [arrows, setArrows] = useState([]);
  const [arrowsDisplay, setArrowsDisplay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [button, setButton] = useState("");
  const [prepare, setPrepare] = useState(true);

  // Set the rule of this game
  useEffect(() => {
    const generateArrowRule = () => {
    const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // Shuffle using Fisher-Yates
    for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    // Reject if it's the unwanted pattern
    const isDefault = directions.join() === ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].join();
    return isDefault ? generateArrowRule() : directions;
    };

    setRule(generateArrowRule());
    
  },[])

  // Generate arrows sequence when game is started
  useEffect(() => {
    if (!start) return;

    // Create array for collect random arrows sequence
    const newArrows = [];
    // Create array for collect random arrows sequence to show on display
    const newArrowsDisplay = [];

    // Random the arrows sequence
    for (let i = 0; i < (Math.floor(Math.random() * (6  - 4) ) + 4); i++) {
        const random = Math.random();
        
        let select;
        if (random <= 0.25) {
            select = sendRule[0];
            newArrowsDisplay.push("ArrowUp")
        } else if (random <= 0.5) {
            select = sendRule[1];
            newArrowsDisplay.push("ArrowDown")
        } else if (random <= 0.75) {
            select = sendRule[2];
            newArrowsDisplay.push("ArrowLeft")
        } else {
            select = sendRule[3];
            newArrowsDisplay.push("ArrowRight")
        }
        newArrows.push(select)
    }

    // Set the value in the useState
    setArrows(newArrows);
    setArrowsDisplay(newArrowsDisplay);
    setCurrentIndex(0);

    // Render again when arrows and currentIndex are changed
  }, [start]);

  // Generate new arrows sequence when player's press "Space"
  useEffect(() => {

    const handleKeyDown = async (e) => {
      if (e.key === ' ' && currentIndex === arrows.length && start) {
        // Create array for collect random arrows sequence
        const newArrows = [];
        // Create array for collect random arrows sequence to show on display
        const newArrowsDisplay = [];

        // Random the arrows sequence
        for (let i = 0; i < (Math.floor(Math.random() * (6 - 4) ) + 4); i++) {
            const random = Math.random();
            let select;
            if (random <= 0.25) {
                select = sendRule[0];
                newArrowsDisplay.push("ArrowUp")
            } else if (random <= 0.5) {
                select = sendRule[1];
                newArrowsDisplay.push("ArrowDown")
            } else if (random <= 0.75) {
                select = sendRule[2];
                newArrowsDisplay.push("ArrowLeft")
            } else {
                select = sendRule[3];
                newArrowsDisplay.push("ArrowRight")
            }
            newArrows.push(select)
        }

        // Set the value in the useState
        setArrows(newArrows);
        setArrowsDisplay(newArrowsDisplay);
        setCurrentIndex(0);

        const newCombo = combo + 1;
        setCombo(newCombo);

        const newScore = (score + 500) + (combo + 1) * 100;
        setScore(newScore);

        if (newCombo > highestCombo) {
          setHighestCombo(newCombo);
        }
      }

      // If player's press all arrows sequence correct, then it will stop to get the value key from the player's press
      if (arrows.length === 0 || currentIndex >= arrows.length) return;
      
      // Check the player's press is correct or not
      const expected = arrows[currentIndex];
      if (e.key === expected) {

        // If all sequence is done
        if (currentIndex + 1 === arrows.length) {
          
        }

        setCurrentIndex(prev => prev + 1);

        // If the player's press is wrong
      } else if (e.key.startsWith("Arrow")) {
        setCurrentIndex(0)
        if (combo > highestCombo) {
          setHighestCombo(combo);
        }
        setCombo(0);
      }
    };

    // Get value key from keyboard
    // addEventListener =>  a function to run when a specific event occurs (like a click, scroll, keypress, etc.).
    // removeEventListener => remove a previously added event listener so it no longer triggers.
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

    // Render again when arrows and currentIndex are changed
  }, [arrows, currentIndex]);

  function handleButton(button) {
      if (button === 'Space' && currentIndex === arrows.length) {
        // Create array for collect random arrows sequence
        const newArrows = [];
        // Create array for collect random arrows sequence to show on display
        const newArrowsDisplay = [];

        // Random the arrows sequence
        for (let i = 0; i < (Math.floor(Math.random() * (6 - 4) ) + 4); i++) {
            const random = Math.random();
            let select;
            if (random <= 0.25) {
                select = sendRule[0];
                newArrowsDisplay.push("ArrowUp")
            } else if (random <= 0.5) {
                select = sendRule[1];
                newArrowsDisplay.push("ArrowDown")
            } else if (random <= 0.75) {
                select = sendRule[2];
                newArrowsDisplay.push("ArrowLeft")
            } else {
                select = sendRule[3];
                newArrowsDisplay.push("ArrowRight")
            }
            newArrows.push(select)
        }

        // Set the value in the useState
        setArrows(newArrows);
        setArrowsDisplay(newArrowsDisplay);
        setCurrentIndex(0);

        const newCombo = combo + 1;
        setCombo(newCombo);

        const newScore = score + 500;
        setScore(newScore);

        if (newCombo > highestCombo) {
          setHighestCombo(newCombo);
        }
      }

      // If player's press all arrows sequence correct, then it will stop to get the value key from the player's press
      if (arrows.length === 0 || currentIndex >= arrows.length) return;
      
      // Check the player's press is correct or not
      const expected = arrows[currentIndex];
      if (button === expected) {

        // If all sequence is done
        if (currentIndex + 1 === arrows.length) {
          
        }

        setCurrentIndex(prev => prev + 1);

        // If the player's press is wrong
      } else if (button.startsWith("Arrow")) {
        setCurrentIndex(0)
        if (combo > highestCombo) {
          setHighestCombo(combo);
        }
        setCombo(0);
      }
      setButton("");
    }

  useEffect(() => {
    handleButton(button);
  }, [button])

  useEffect(() => {
    if (start) {
      const timeout = setTimeout(() => {
        setPrepare(false);
      }, 6000); // show after 2 seconds

      return () => clearTimeout(timeout);
    }
}, [start]);

  return (
    <>
    <h1 className='text-[56px] font-bold max-sm:text-[32px]'>Score: {score}</h1>
    {!showRuleModal && <div className='bg-black w-100 p-5 pb-10 rounded-lg border-2 border-[#FF00C8] max-sm:w-[100%]'>
      <h1 className='text-[24px] text-white font-bold text-center'>Rule</h1>
      <p className='text-[16px] text-white font-semibold text-center my-1'>Show</p>
      <div className='flex justify-center gap-3'>
          <FaArrowUp className='text-white text-[36px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>
          <FaArrowDown className='text-white text-[36px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>
          <FaArrowLeft className='text-white text-[36px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>
          <FaArrowRight className='text-white text-[36px] bg-gradient-to-b from-[#38B6FF] to-[#44489A] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>
      </div>
      <div className='flex justify-center'>
          <hr className='border-white border-2 my-5 w-50 max-sm:w-[100%]'/>
      </div>
      <p className='text-[16px] text-white font-semibold text-center mb-5'>Press</p>
      <div className='flex justify-center gap-3'>
          {rule.map((arrow, index) => (
          <>
          {arrow === "ArrowUp" && <FaArrowUp className='text-white text-[36px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>}
          {arrow === "ArrowDown" && <FaArrowDown className='text-white text-[36px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>}
          {arrow === "ArrowLeft" && <FaArrowLeft className='text-white text-[36px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>}
          {arrow === "ArrowRight" && <FaArrowRight className='text-white text-[36px] bg-gradient-to-b from-[#7ed957] to-[#007e56] p-2 rounded-full max-sm:text-[24px] max-sm:p-1'/>}
          </>
          ))}
      </div>
    </div>}
    <div className='absolute top-125 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:top-90'>
      {(arrowsDisplay.length != 0 && start && !prepare) && <div className="flex flex-col items-center mt-15">
        <div className='flex justify-end w-100 max-sm:w-[100%]'>
          <p className='font-semibold'>Combo: {combo}</p>
        </div>
        <div className="flex gap-1 bg-black/25 py-2 px-20 border-2 border-black rounded-full max-sm:px-10">
          {arrowsDisplay.map((arrow, index) => (
            <div key={index} className={`text-white text-[36px] ${index < currentIndex ? "bg-gradient-to-b from-[#7ed957] to-[#007e56]" : "bg-gradient-to-b from-[#38B6FF] to-[#44489A]"} p-2 rounded-full max-sm:text-[24px]`}>
              {arrow === "ArrowUp" && <FaArrowUp/>}
              {arrow === "ArrowDown" && <FaArrowDown/>}
              {arrow === "ArrowLeft" && <FaArrowLeft/>}
              {arrow === "ArrowRight" && <FaArrowRight/>}
            </div>
          ))}
        </div>
      </div>}
    </div>
    <div className='hidden max-sm:block absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex gap-5 text-[36px] mb-10'>
            <button onClick={() => handleButton(setButton("ArrowUp"))} className='bg-gradient-to-b from-[#FF00C8] to-[#990078] p-5 rounded-full'><FaArrowUp/></button>
            <button onClick={() => handleButton(setButton("ArrowDown"))} className='bg-gradient-to-b from-[#FF00C8] to-[#990078] p-5 rounded-full'><FaArrowDown/></button>
            <button onClick={() => handleButton(setButton("ArrowLeft"))} className='bg-gradient-to-b from-[#FF00C8] to-[#990078] p-5 rounded-full'><FaArrowLeft/></button>
            <button onClick={() => handleButton(setButton("ArrowRight"))} className='bg-gradient-to-b from-[#FF00C8] to-[#990078] p-5 rounded-full'><FaArrowRight/></button>
          </div>
          <div className='flex justify-center'>
            <button onClick={() => handleButton("Space")} className='bg-gradient-to-b from-[#FF00C8] to-[#990078] px-20 py-5 rounded-xl text-[36px]'>SPACE</button>
          </div>
    </div>
    {showResult && <ResultModal score={score} highestCombo={highestCombo}></ResultModal>}
    </>
  );
}
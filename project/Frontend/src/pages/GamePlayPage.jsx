import { React, useEffect, useState} from 'react'
import GifBG from '../images/NeonPinkGrid.gif'; 
import Controller from '../components/Controller'
import ArrowKeyListener from '../components/ArrowKeys'
import Timer from '../components/Timer'
import RuleModal from '../components/RuleModal';
import { sendStart } from '../components/RuleModal';
import BgAudio from '../components/BgAudio';

export let sendRule = [];
export function setSendRule(rule){
    sendRule = rule;
}

const GamePlayPage = () => {
    const [rule, setRule] = useState([]);
    const [start, setStart] = useState(false)
    const [showRuleModal, setShowRuleModal] = useState(true);
    const [showResult, setShowResult] = useState(false);

    ArrowKeyListener()

    useEffect(() => {
        setSendRule(rule);
    }, [rule])

    useEffect(() => {
        setStart(sendStart);
    }, [sendStart])

    useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <>
    <BgAudio></BgAudio>
    {showRuleModal && <RuleModal setShowRuleModal={setShowRuleModal} rule={rule}></RuleModal>}
    <div className="w-full min-h-screen bg-cover bg-center text-white" style={{backgroundImage: `url(${GifBG})`,}}>
        <div className='flex justify-between items-start px-5'>
            <div>
                <Controller showRuleModal={showRuleModal} rule={rule} setRule={setRule} start={start} showResult={showResult}></Controller>
            </div>
            <Timer start={start} setStart={setStart} setShowResult={setShowResult}></Timer>
        </div>
    </div>
    </>
  )
}

export default GamePlayPage
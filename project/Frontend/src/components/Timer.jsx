import { React, useState, useEffect } from 'react'

const Timer = ({start, setStart, setShowResult}) => {

    const [timeLeft, setTimeLeft] = useState(30);
    const readySet = ['Ready','3','2','1','Start']
    const [ready, setReady] = useState()
    const [count, setCount] = useState(0);
    const [isStart, setIsStart] = useState(false)

    useEffect(() => {
      let intervalReady;
      let interval;

        if (start && timeLeft <= 0) {
            setStart(false);
            setShowResult(true);
            setTimeLeft(30);
        }

        if (!start || timeLeft <= 0) return;

        if (isStart) {
          interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
          }, 1000);
        }
        
        if (!isStart && count < 6) {
            intervalReady = setInterval(() => {
            setReady(readySet[count]); // e.g. ['Ready', 3, 2, 1, 'GO']
            setCount((prev) => prev + 1);
          }, 1000);
        } else {
          setIsStart(true);
        }

        return () => {
          clearInterval(intervalReady);
          clearInterval(interval);
        };

    }, [timeLeft, start, count, isStart]);

  return (
    <>
    {!isStart && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <h1 className='text-[256px] opacity-50 max-sm:text-[128px]'>{ready}</h1>
    </div>}
    <div>
        <h1 className='text-[56px] font-bold max-sm:text-[32px]'>{timeLeft}</h1>
    </div>
    </>
  )
}

export default Timer
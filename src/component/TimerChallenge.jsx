import { useState , useRef} from "react"
import ResultModal from "./ResultModal"



//let timer


export default function TimeChallenge ({title, targetTime}) {

    const timer = useRef();
    const dialog = useRef()

const [timeRemaing, setTimeRemaining] = useState(targetTime * 1000)

const timerIsActive = timeRemaing > 0 && timeRemaing < targetTime * 1000;

if (timeRemaing <= 0)  {
    clearInterval(timer.current);
    dialog.current.open();
}

function handleReset() {
    setTimeRemaining(targetTime * 1000)

}


function handleStart() {
  timer.current =   setInterval (()  => {
    setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        // setTimerExpired(true)
        // dialog.current.open()
    },   10)

}

function handleStop() {
    clearInterval(timer.current)
    dialog.current.open();

}


    return (
        <>

        <ResultModal ref={dialog}  targetTime={targetTime} remainingTime={timeRemaing} onReset={handleReset} />
    <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>

        
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
               {timerIsActive  ? 'stop' : 'start'} challenge
            </button>
        </p>

        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ?  'Time is running...' :  'Timer inactive'}
        </p>
    </section>
    </>
    )
}
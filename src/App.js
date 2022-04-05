import index from "./index.css"
import { useEffect, useState} from 'react'

const App = () => { 
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [secondsRight, setSecondsRight] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(2)
  const [minutesRight, setMinutesRight] = useState(5)
  const [isActive, setIsActive] = useState(false)
  const [countDownStart, setCountDownStart] = useState(false)
  const [breakMinutesLeft, setBreakMinutesLeft] = useState(0)
  const [breakMinutesRight, setBreakMinutesRight] = useState(5)
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(0)
  const [breakSecondsRight, setBreakSecondsRight] = useState(0)
  const [breakIsActive, setBreakIsActive] = useState(false)
  const [audio] = useState(new Audio("http://soundbible.com/grab.php?id=535&type=wav"))
 
 
  
 
  
  const pauseCountDown = () => {
    setSecondsLeft(sec => sec = sec)
    setSecondsRight(sec => sec = sec)
    setMinutesRight(min => min = min)
    setMinutesLeft(min => min = min)
  }
  
  const pauseBreakCountDown = () => {
    setBreakSecondsLeft(sec => sec = sec)
    setBreakSecondsRight(sec => sec = sec)
    setBreakMinutesLeft (min => min = min)
    setBreakMinutesRight(min => min = min)
  }
  
  
  
  const startTheSession = () => {
    setIsActive(active => !active)
    setCountDownStart(true)
      if(isActive && !countDownStart){
      setSecondsLeft(5)
      setSecondsRight(9)
      setMinutesRight(minutesRight - 1)
      } else if(!isActive && countDownStart){
       pauseCountDown()  
      } 
   }
  
  const breakCountDownControl = () => {
    if(!isActive && breakIsActive && countDownStart){
      pauseBreakCountDown()
    }
  }
   
  const sessionIncrement = () => {
     if(minutesRight < 9 && minutesLeft < 6){
       setMinutesRight(min => min + 1)
     } else if(minutesRight <= 9 && minutesLeft < 6){
       setMinutesLeft(min => min + 1)
       setMinutesRight(0)
     } else if(minutesLeft == 6 && minutesRight == 0){
       setMinutesLeft(6)
       setMinutesRight(0)
     }
   }
  
  const sessionDecrement = () => {
    if(minutesRight > 0 && minutesLeft > 0){
      setMinutesRight(min => min - 1)
    } else if(minutesRight >= 0 && minutesLeft > 0){
      setMinutesLeft(min => min - 1)
      setMinutesRight(9)
    } else if(minutesLeft == 0 && minutesRight > 1){
      setMinutesRight(min => min - 1)
    } else if(minutesLeft == 0 && minutesRight == 1){
      setMinutesLeft(0)
      setMinutesRight(1)
    }
  }
  
  
  const breakIncrement = () => {
    if(breakMinutesRight < 9 && breakMinutesLeft < 6){
       setBreakMinutesRight(min => min + 1)
     } else if(breakMinutesRight <= 9 && breakMinutesLeft < 6){
       setBreakMinutesLeft(min => min + 1)
       setBreakMinutesRight(0)
     } else if(breakMinutesLeft == 6 && breakMinutesRight == 0){
       setBreakMinutesLeft(6)
       setBreakMinutesRight(0)
     }
  }
   const breakDecrement = () => {
    if(breakMinutesRight > 0 && breakMinutesLeft > 0){
      setBreakMinutesRight(min => min - 1)
    } else if(breakMinutesRight >= 0 && breakMinutesLeft > 0){
      setBreakMinutesLeft(min => min - 1)
      setBreakMinutesRight(9)
    } else if(breakMinutesLeft == 0 && breakMinutesRight > 1){
      setBreakMinutesRight(min => min - 1)
    } else if(breakMinutesLeft == 0 && breakMinutesRight == 1){
      setBreakMinutesLeft(0)
      setBreakMinutesRight(1)
    }
  }
   
   const reset = () => {
   setBreakMinutesLeft(0)
   setBreakMinutesRight(5)
   setBreakSecondsLeft(0)
   setBreakSecondsRight(0)
   setSecondsLeft(0)
   setSecondsRight(0)
   setMinutesRight(5)
   setMinutesLeft(2)
   setIsActive(false)
   setCountDownStart(false)
   setBreakIsActive(false)
 }
   
   
     
   useEffect(() => {
     let interval = null
     let breakInterval = null
     if(isActive &&  secondsRight >= 0){ 
       interval = setTimeout(() => {
         setSecondsRight(sec => sec - 1)
       }, 1000)
     } else if(isActive && !breakIsActive && secondsRight <= 0 && secondsLeft > 0){
       setSecondsLeft(sec => sec - 1) 
       setSecondsRight(9)
       interval = setTimeout(() => {
         setSecondsRight(sec => sec - 1)
       }, 1000)
       clearTimeout(interval)
     } else if(isActive && !breakIsActive && secondsRight <= 0 && secondsLeft == 0 && minutesRight > 0){
       setMinutesRight(min => min - 1)
       setSecondsLeft(5)
       setSecondsRight(9)
       clearTimeout(interval)
     } else if(isActive && !breakIsActive && minutesRight <= 0 && minutesLeft > 0 && secondsRight <= 0 && secondsLeft <= 0){
       setMinutesLeft(min => min - 1)
       setMinutesRight(9)
       setSecondsLeft(5)
       setSecondsRight(9) 
       clearTimeout(interval)
     } else if(isActive && !breakIsActive && minutesRight == 0 && minutesLeft == 0 && secondsRight == -1 && secondsLeft == 0){
       clearTimeout(interval)
       audio.play()
       setSecondsRight(0)
       setBreakIsActive(true)
       setIsActive(false)
     } else if(!isActive  && secondsRight == -1){
       setSecondsRight(0) 
     } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft == 0 && breakMinutesRight > 0 && breakSecondsLeft == 0 && breakSecondsRight < 0){
        setBreakMinutesRight(breakMinutesRight - 1)
        setBreakSecondsLeft(5) 
        setBreakSecondsRight(9)   
      } else if(!isActive && breakIsActive && minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft == 0 && breakMinutesRight >= 0 && breakSecondsLeft >= 0  && breakSecondsRight >= 0){  
        breakInterval = setTimeout(() => {
          setBreakSecondsRight(sec => sec - 1)
        }, 1000)
      } else if(!isActive && breakIsActive && minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft <= 0 && breakMinutesRight > 0 && breakSecondsLeft > 0 && breakSecondsRight <= 0){
        setBreakSecondsRight(9)
        setBreakSecondsLeft(sec => sec - 1)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft > 0 && breakMinutesRight > 0 && breakSecondsLeft == 0 && breakSecondsRight < 0){
         setBreakMinutesRight(breakMinutesRight - 1)
         setBreakSecondsLeft(5)
         setBreakSecondsRight(9)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft > 0 && breakMinutesRight >= 0 && breakSecondsLeft >= 0 && breakSecondsRight >= 0){
        breakInterval = setTimeout(() => {
          setBreakSecondsRight(sec => sec - 1)
        }, 1000)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft > 0 && breakMinutesRight >= 0 && breakSecondsLeft > 0 && breakSecondsRight < 0){
        setBreakSecondsLeft(sec => sec - 1)
        setBreakSecondsRight(9)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft > 0 && breakMinutesRight == 0 && breakSecondsLeft == 0 && breakSecondsRight == -1){
        setBreakMinutesLeft(min => min - 1)
        setBreakMinutesRight(9)
        setBreakSecondsLeft(5)
        setBreakSecondsRight(9)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft == 0 && breakMinutesRight == 0 && breakSecondsLeft > 0 && breakSecondsRight < 0){
        setBreakSecondsLeft(sec => sec - 1)
        setBreakSecondsRight(9)
      } else if(!isActive && breakIsActive &&  minutesRight == 0 && minutesLeft == 0 && secondsRight == 0 && secondsLeft == 0 && breakMinutesLeft == 0 && breakMinutesRight == 0 && breakSecondsLeft == 0 && breakSecondsRight <= -1){
        audio.play()
        setBreakSecondsRight(0)
        clearTimeout(breakInterval)
        reset()
        setIsActive(true)
      }
   }, [secondsRight, isActive, breakIsActive, breakSecondsRight, audio])
   
   
   
 
  
   
   
  console.log(breakIsActive, isActive)
 
   
   
 
   
   
  
    
   return (
       <>
         <div className="main--container">
           <div id="media--icons" className="arrows"><i class="fa-brands fa-facebook"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-snapchat"></i><i class="fa-brands fa-github"></i></div>
           <div id="contact--info">
             <h3>contact Info</h3>
             <hr></hr>
             </div>
             <div>
             <h3>phone: 999-999-9999</h3>
             <h3>Email: fake@fakeEmail.com</h3>
             </div>
           
           <h1 id="title">25 + 5 Clock</h1>
          <div className="length--container">
            
            <div className="break--container">
           <div id="break-label">Break Length</div>
              <div className="increment--container">
              <div id="break-decrement" onClick={breakDecrement}  className="arrows"> 
                <i class="fa-solid fa-arrow-down"></i>
                <span id="break-num"><span id="break-length">{breakMinutesLeft <= 0 ? breakMinutesRight : `${breakMinutesLeft}${breakMinutesRight}`}</span></span>
              </div>
              <div id="break-increment" onClick={breakIncrement}  className="arrows"><i class="fa-solid fa-arrow-up"></i></div>
                </div>
            </div>
            <div className="session-decrement">
            <div id="session-label">Session Length</div>
              <div className="session--increment--container">
              <div id="session-decrement" onClick={sessionDecrement} className="arrows"><i class="fa-solid fa-arrow-down"></i></div>
                <span id="session-num"><span id="session-length">{minutesLeft <= 0 ? minutesRight : `${minutesLeft}${minutesRight}`}</span></span>
                <div id="session-increment" className="arrows" onClick={() => {sessionIncrement()}}><i class="fa-solid fa-arrow-up"></i></div>
              <audio id="beep" src="http://soundbible.com/grab.php?id=1251&type=wav"></audio>
              </div>
            </div>
            
           </div>
           <div className="user--container">
              <div id="time-label">{breakIsActive ? "Break" : "Session"}</div>
              {!breakIsActive && <div  id="time-left">{minutesLeft}{minutesRight}:{secondsLeft}{secondsRight}</div>}
              {breakIsActive && <div  id="time-left">{breakMinutesLeft}{breakMinutesRight}:{breakSecondsLeft}{breakSecondsRight}</div>}
             <div className="timer--container">
             <div id="start_stop" className="arrows" onClick={() => {startTheSession(); breakCountDownControl()}}><span><i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i></span></div>
             <div id="reset" className="arrows" onClick={reset}><i class="fa-solid fa-arrow-rotate-left"></i></div>
           </div>
         </div>
           
       </div>
       
       </>
   )
 }

export default App;

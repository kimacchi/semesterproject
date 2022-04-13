import React, {useState, useEffect } from 'react'



const Pomodoro = () => {
    const [timerState, setState] = useState({session: 25, break: 5, sessionCount: 2, started: false, paused: false, onBreak: false})
    const [counter, setCounter] = useState({minutes: 25, seconds: 0, leftSession: 2});

    useEffect(()=>{
        setCounter((prev)=>({...prev, minutes: timerState.session, leftSession: timerState.sessionCount}));
    }, [timerState.sessionCount, timerState.session])

    useEffect(()=>{
        setCounter((prev)=>({...prev, minutes: timerState.session}));
    }, [timerState.session])

    useEffect(()=>{
        if(timerState.started){
            let interval = setInterval(()=>{
                clearInterval(interval);
                if(counter.seconds === 0){
                    if(counter.minutes !== 0){
                        setCounter(prev=>({...prev, seconds: 59, minutes: counter.minutes - 1}));
                    }else {
                        if(!timerState.onBreak){
                            setState(prev=>({...prev, onBreak: true}));
                            setCounter(prev=>({...prev, minutes: timerState.break - 1, seconds: 59}))
                        }else{
                            setState(prev=>({...prev, onBreak: false}));
                            setCounter(prev=>({...prev, leftSession: counter.leftSession - 1, minutes: timerState.session - 1, seconds: 59}))                            
                        }
                        if(counter.leftSession === 0){
                            alert("All sessions have ended.");
                            setState((prev)=>({...prev, started: false, paused: false, onBreak: false}));
                            setCounter((prev)=>({...prev, minutes: 0, seconds: 0}))
                        }
                    }
                }else{
                    setCounter(prev=>({...prev, seconds: counter.seconds - 1}));
                }
            }, 1000)
        }
    }, [timerState.started, counter.seconds, timerState.break, counter.leftSession, counter.minutes, timerState.onBreak, timerState.session])


  return (
    <div className='pomodoro_wrapper'>
        <div className='pomodoro__timer'>
            <p className='pomodoro__timer-p'>
                {`${counter.minutes > 9 ? counter.minutes : '0' + counter.minutes}:${counter.seconds > 9 ? counter.seconds : '0' + counter.seconds}`}
            </p>
            <div className='pomodoro__timer-buttons'>
                <button 
                    className='pomodoro__timer-button' 
                    onClick={()=>{
                            setState((prev)=>({...prev, started: false, paused: false, onBreak: false}));
                            setCounter((prev)=>({...prev, minutes: timerState.session, seconds: 0, leftSession: timerState.sessionCount}));
                            setTimeout(()=>{
                                setCounter((prev)=>({...prev, minutes: timerState.session, seconds: 0, leftSession: timerState.sessionCount}));
                            }, 1000)
                        }
                    }
                >
                R    
                </button>
                <button 
                    className='pomodoro__timer-middle_button'
                    onClick={()=>{
                            setState((prev)=>({...prev, started: true, paused: false, onBreak: false}));
                        }
                    }
                >
                S  
                </button>
                <button 
                    className='pomodoro__timer-button'
                    onClick={()=>{
                        setState((prev)=>({...prev, started: false, paused: true}));
                    }
                }
                >
                P
                </button>
            </div>    
        </div>
        <div className='pomodoro__timer-settings'>
            <div className='session__setting'>
                <span>Session duration</span>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, session: timerState.session - 1 <= 10 ? 10 : timerState.session - 1}))
                    }}
                >-</button>
                <p>{timerState.session}</p>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, session: timerState.session + 1 >= 120 ? 120 : timerState.session + 1}))
                    }}
                >+</button>
            </div>
            <div className='session__setting-second'>
                <span>Session count</span>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, sessionCount: timerState.sessionCount - 1 <= 1 ? 1 : timerState.sessionCount - 1}))
                    }}
                >-</button>
                <p>{timerState.sessionCount}</p>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, sessionCount: timerState.sessionCount + 1 >= 10 ? 10 : timerState.sessionCount + 1}))
                    }}
                >+</button>
            </div>
            <div className='break__setting'>
                <span>Break duration</span>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, break: timerState.break - 1 <= 2 ? 2 : timerState.break - 1}))
                    }}
                >-</button>
                <p>{timerState.break}</p>
                <button 
                    disabled={timerState.started || timerState.paused}
                    onClick={()=>{
                        setState((prev)=>({...prev, break: timerState.break + 1 >= 60 ? 60 : timerState.break + 1}))
                    }}
                >+</button>
            </div>
        </div>
    </div>
  )
}

export default Pomodoro
import React, {useState} from 'react'
import Countdown from 'react-countdown';
import useLongPress from '../../hooks/useLongPress';

const renderer = ({ hours, minutes, seconds, completed, api }) => {
    if (completed) {
      // Render a completed state
      return <span>dsfgsdfg</span>;
    } else {
      // Render a countdown
      if(hours === 0){
          return <span>{`${minutes > 9 ? "" : "0"}${minutes}:${seconds > 9 ? "" : "0"}${seconds}`}</span>
      }
      return <span>{`${hours > 9 ? "" : "0"}${hours}:${minutes > 9 ? "" : "0"}${minutes}:${seconds > 9 ? "" : "0"}${seconds}`}</span>;
    }
  };


const Pomodoro = () => {
    const [timerState, setState] = useState({session: 25, break: 5})


    const onLongPressIncSession = () => {
        setTimeout(()=>{console.log("a")}, 500)
    };

    const onClickIncSession = () => {
        setState(prev=>({...prev, session: timerState.session + 1}))
    }

    const onLongPressDecSession = () => {
        console.log('longpress is triggered');
    };

    const onClickDecSession = () => {
        setState(prev=>({...prev, break: timerState.session - 1}))
    }

    const onLongPressIncBreak = () => {
        console.log('longpress is triggered');
    };

    const onClickIncBreak = () => {
        setState(prev=>({...prev, break: timerState.break + 1}))
    }

    const onLongPressDecBreak = () => {
        console.log('longpress is triggered');
    };

    const onClickDecBreak = () => {
        setState(prev=>({...prev, break: timerState.break - 1}))
    }

    

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPressIncSession, onClickIncSession, defaultOptions);

  return (
    <div>
        <Countdown 
            date={Date.now() + 5000000}
            renderer={renderer}
            autoStart={false}
        >
            <span>dsfgsdfg</span>
        </Countdown>
        <div>
            <div>
                <p>Break Length</p>    
                <button {...longPressEvent}>dfg</button>            
            </div>

            <div>
                <p>Session Length</p>                
                
            </div>
        </div>
    </div>
  )
}

export default Pomodoro
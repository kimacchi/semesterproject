import React from 'react';
import {motion} from "framer-motion";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Activities from './Modules/Activities';
import Projects from "./Modules/Projects";
import Todo from './Modules/Todo';
import Pomodoro from './Modules/Pomodoro';


const Home = () => {

    const currentUser = useSelector((state)=>state.currentUser);
    const navigate = useNavigate();
    useEffect(()=>{
        if(currentUser.userId === undefined){
            navigate("/");
        }
    }, [currentUser, navigate])
    

  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration:0.6}}
        className="home-main-div"
    >
        <div className='home__widgets'>
            <motion.div 
                className='home__activities'
                initial={{opacity: 0, scale: 0.7}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
            >
                <Activities />
            </motion.div>

            <motion.div 
                className='home__expenses'
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: [0, 0, 1, 1], scale: [0.8, 0.8, 1, 1]}}
                transition={{duration: 1.4, times: [0, 0.3, 0.8, 1]}}
            >
                <Pomodoro/>
            </motion.div>

            <motion.div 
                className='home__projects'
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: [0, 0, 0.8, 1], scale: [0.6, 0.6, 1, 1]}}
                transition={{duration: 2, times: [0, 0.1, 0.5, 1]}}
            >
                <Projects />
            </motion.div>

            <motion.div 
                className='home__todo'
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: [0, 0, 0, 0.8, 1], scale: [0.8, 0.8, 0.8, 1, 1]}}
                transition={{duration: 2.4, times: [0, 0.1, 0.2, 0.6, 1]}}
            >
                <Todo />
            </motion.div>
        </div>
    </motion.div>
  )
}

export default Home
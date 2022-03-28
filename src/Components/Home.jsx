import React from 'react';
import {motion, AnimatePresence} from "framer-motion";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import Activities from './Modules/Activities';


const Home = () => {
    
    // JUST FOR DEVELOPMENT DONT FUCKING FORGET TO DELETE THIS
    const dispacth = useDispatch();
    const {setCurrentUser} = bindActionCreators(actionCreators, dispacth);

    useEffect(()=>{
        setCurrentUser("Kimacchi", 2024);
    }, []);

    // DELETE IT!!!!!!!!!!!!!!

    const currentUser = useSelector((state)=>state.currentUser);
    const navigate = useNavigate();

    

  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration:0.6}}
        className="home-main-div"
    >
        <div className='home__widgets'>
            <div className='home__activities'>
                <Activities />
            </div>
            <div className='home__expenses'></div>
            <div className='home__projects'></div>
            <div className='home__todo'></div>
        </div>
    </motion.div>
  )
}

export default Home
import React from 'react'
// import { Axios } from 'axios';
import {motion, AnimatePresence, animateVisualElement} from "framer-motion";
import {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import img from "../../assets/add_button.png";


const axios =require("axios");


 

const Activities = () => {
    const [activityState, setState] = useState({activities: [], currentId: -10})
    const currentId = useSelector((state)=>state.currentUser.userId);
    useEffect(()=>{
        setState(prev=>({...prev, currentId}))
    }, [currentId])
    useEffect(()=>{
        if(activityState.currentId !== undefined){
            axios.get("http://localhost:5000/api/activities/" + activityState.currentId).then((data)=>{
                setState((prev)=>({...prev, activities:[...data.data]}));
            })
        }
    }, [activityState.currentId]);
    useEffect(()=>{
        setState(prev=>({...prev, activities: activityState.activities.sort((a,b)=>{
            const timeA = new Date(a.activityTime).getTime();
            const timeB = new Date(b.activityTime).getTime();
            console.log(timeA);
            return timeA > timeB ? 1 : -1;
            })}))
    }, []);
  return (
    <motion.div
        className='activities-main-div'
    >
        <p>Approaching Activities</p>
        <motion.div
            className='activities__list'
        >
            {activityState.activities.length === 0 ? 
                <div className='activities__empty-list'>
                    <p>Seems like you have no activities. Add some!</p>
                    <div className='no-activity__add-button'>
                        <img src={img}></img>
                    </div>
                </div>
                :
                <div className='activities__list-items'>
                    {activityState.activities.map((ele)=>{
                        return (
                            <div key={Date.now().toString() + ele.activityId.toString()} className='activities__list-items-item'>
                                <p style={{margin: "0 0 10px 10px"}}>{ele.activityName}<br></br>{ele.activityTime.replace("T", " ")}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </motion.div>
    </motion.div>
  )
}

export default Activities
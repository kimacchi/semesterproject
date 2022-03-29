import React from 'react'
// import { Axios } from 'axios';
import {motion, AnimatePresence, animateVisualElement} from "framer-motion";
import {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import img from "../../assets/add_button.png";
import Modal from "react-modal";


const axios =require("axios");


Modal.defaultStyles.overlay = {
    ...Modal.defaultStyles.overlay,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
}

Modal.defaultStyles.content = {
    ...Modal.defaultStyles.content,
    background: "linear-gradient(0deg, rgba(10,83,78,1) 0%, rgba(19,85,78,1) 32%, rgba(16,65,83,1) 64%, rgba(5,22,66,1) 100%)",
    border: "none",
    width: "60vw",
    height: "70vh",
    top: "15vh",
    left: "20vw",
    bottom: 0,
    right: 0
}

console.log(Modal.defaultStyles)

Modal.setAppElement("#root")

const Activities = () => {
    const [activityState, setState] = useState({activities: [], currentId: -10, modalIsOpen: false})
    const currentId = useSelector((state)=>state.currentUser.userId);

    const openModal = ()=>{
        setState(prev => ({...prev, modalIsOpen: true}))
    } 

    const closeModal = ()=>{
        setState(prev => ({...prev, modalIsOpen: false}))
    } 


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
    }, [activityState.activities]);
  return (
    <motion.div
        className='activities-main-div'
    >
        <Modal
            isOpen={activityState.modalIsOpen}
            onRequestClose={closeModal}
        >

        </Modal>
        <p>Approaching Activities</p>
        <motion.div
            className='activities__list'
        >
            {activityState.activities.length === 0 ? 
                <div className='activities__empty-list'>
                    <p>Seems like you have no activities. Add some!</p>
                    <div className='no-activity__add-button' onClick={openModal}>
                        <img src={img} alt="add item"></img>
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
                    <div className='no-activity__add-button' onClick={openModal}>
                        <img src={img} alt="add item" style={{marginTop: 60}}></img>
                    </div>
                </div>
            }
        </motion.div>
    </motion.div>
  )
}

export default Activities
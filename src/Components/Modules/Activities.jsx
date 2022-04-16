import * as React from 'react';
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import img from "../../assets/add_button.png";
import Modal from "react-modal";
// import Calendar from 'react-calendar';
import { Button, Typography, ButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider, createTheme} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { remainingDate } from '../../functions/remaining-date';

const axios =require("axios");


const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
})

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
    height: "90vh",
    top: "2vh",
    left: "20vw",
    bottom: 0,
    right: 0
}

Modal.setAppElement("#root")

const Activities = () => {
    const [activityState, setState] = useState({activities: [], currentId: undefined, modalIsOpen: false, secondModalIsOpen: false, date: new Date(), time: new Date(), activityName: "", activityDescription: "", thirdModalIsOpen: false, currentActivity: {}})
    const currentId = useSelector((state)=>state.currentUser.userId);

    const setCurrentActivity = (activity)=>{
        setState(prev=>({...prev, currentActivity: activity}));
    }

    const openModal = ()=>{
        setState(prev => ({...prev, modalIsOpen: true}))
    } 

    const openSecondModal = ()=>{
        if(activityState.activityName !== ""){
            setState(prev => ({...prev, secondModalIsOpen: true}))
        }
    } 

    const openThirdModal = (activity)=>{
        setState(prev => ({...prev, thirdModalIsOpen: true}))
        setState(prev=>({...prev, currentActivity: activity}));
    } 

    const closeModal = ()=>{
        setState(prev => ({...prev, modalIsOpen: false, secondModalIsOpen: false, thirdModalIsOpen: false, currentActivity: {}}))
    }

    const closeSecondModal =()=>{
        setState(prev => ({...prev, secondModalIsOpen: false}))
    }

    const closeThirdModal =()=>{
        setState(prev => ({...prev, thirdModalIsOpen: false, currentActivity: {}}))
    }

    useEffect(()=>{
        setState(prev=>({...prev, currentId}))
    }, [currentId])
    // useEffect(()=>{
    //     if(activityState.currentId !== undefined){
    //         axios.get(process.env.REACT_APP_API+"activities/" + activityState.currentId).then((data)=>{
    //             setState((prev)=>({...prev, activities:[...data.data]}));
    //         })
    //     }
    // }, []);
    if(activityState.activities.length === 0){
        if(activityState.currentId !== undefined){
            axios.get(process.env.REACT_APP_API+"activities/" + activityState.currentId).then((data)=>{
                setState((prev)=>({...prev, activities:[...data.data]}));
            })
        }
    }
    useEffect(()=>{
        setState(prev=>({...prev, activities: activityState.activities.sort((a,b)=>{
            const timeA = new Date(a.activityTime).getTime();
            const timeB = new Date(b.activityTime).getTime();
            return timeA > timeB ? 1 : -1;
            })}))
    }, [activityState.activities]);

    const onDescriptionChange = (e)=>{
        const text = e.target.value;
        setState((prevState)=>({...prevState, activityDescription: text}));
    }

    const onNameChange = (e)=>{
        const text = e.target.value;
        setState((prevState)=>({...prevState, activityName: text}));
    }

    const addActivityData = ()=>{
        
        var tempMonth;
        var tempDay;
        var tempHour;
        var tempMin;
        if(activityState.date.getMonth() < 10){
            tempMonth = `0${(activityState.date.getMonth()+ 1)}`
        }else{
            tempMonth = `${activityState.date.getMonth() + 1}`
        }
        if(activityState.date.getDate() < 10){
            tempDay = `0${activityState.date.getDate()}`
        }else{
            tempDay = `${activityState.date.getDate()}`
        }
        if(activityState.time.getHours() < 10){
            tempHour = `0${activityState.time.getHours()}`
        }else{
            tempHour = `${activityState.time.getHours()}`
        }
        if(activityState.time.getMinutes() < 10){
            tempMin = `0${activityState.time.getMinutes()}`
        }else{
            tempMin = `${activityState.time.getMinutes()}`
        }
        const dateTime = `${activityState.date.getFullYear()}-${tempMonth}-${tempDay}T${tempHour}:${tempMin}:00`;
        axios.post(process.env.REACT_APP_API+"activities/", {
            activityName: activityState.activityName,
            userId: activityState.currentId,
            description: activityState.activityDescription,
            activityTime: dateTime
        }).then(()=>{
            axios.get(process.env.REACT_APP_API+"activities/" + activityState.currentId).then((data)=>{
                setState((prev)=>({...prev, activities:[...data.data]}));
            })
        })
        setState(prev=>({...prev, secondModalIsOpen: false, modalIsOpen: false, date: new Date(), time: new Date(), activityName: "", activityDescription: ""}))
    }

    const deleteActivity = ()=>{
        axios.delete(process.env.REACT_APP_API+"activities/" + activityState.currentActivity.activityId).then(()=>{
            axios.get(process.env.REACT_APP_API+"activities/" + activityState.currentId).then((data)=>{
                setState((prev)=>({...prev, activities:[...data.data]}));
            })
        })
        closeModal();
    }

  return (
    <motion.div
        className='activities-main-div'
    >
        <Modal
            isOpen={activityState.modalIsOpen}
            onRequestClose={closeModal}
        >
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={darkTheme}>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div style={{width: "40vh", height: "55vh"}}>
                            <StaticTimePicker
                                displayStaticWrapperAs='mobile'
                                value={activityState.time}
                                onChange={(newVal)=>{setState((prev)=>({...prev, time: newVal}))}}
                                renderInput={(params)=><TextField {...params}/>}
                                className="test"
                            />
                        </div>
                        <div style={{width: "35vh", height: "50vh", color: "white"}}>
                            <StaticDatePicker
                                openTo="day"
                                value={activityState.date}
                                onChange={(newValue) => {
                                setState(prev => ({...prev, date: newValue}));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </div>
                </ThemeProvider>
            </LocalizationProvider>
            <div style={{display: "flex", flexDirection:"column", width: "15vw", height: "30vh", justifyContent: "space-around"}}>
                <TextField
                    id="standard-textarea"
                    label="Project Name *"
                    placeholder="Please enter a name..."
                    // multiline
                    variant="standard"
                    onChange={onNameChange}
                />
                <TextField
                    style={{width: "30vw"}}
                    id="standard-textarea"
                    label="Project Description"
                    placeholder=""
                    multiline
                    variant="standard"
                    onChange={onDescriptionChange}
                />
                <Button style={{width: "9vw"}} variant="contained" onClick={openSecondModal}>Add Activity</Button>
                <Modal isOpen={activityState.secondModalIsOpen} className="secondary-activity-modal" onRequestClose={closeSecondModal}>
                    <Typography variant='h6' style={{color: "white", textAlign: "center", marginTop: "10px"}}>Add this activity?</Typography>
                    <ButtonGroup color="secondary" aria-label="medium secondary button group" style={{marginBottom: "20px"}}>
                        <Button onClick={addActivityData}>Add</Button>
                        <Button onClick={closeSecondModal}>Cancel</Button>
                    </ButtonGroup>
                </Modal>
            </div>
        </div>
        </Modal>

        <Modal
            isOpen={activityState.thirdModalIsOpen}
            onRequestClose={closeModal}
            className="third-activity-modal"
        >
            <div className='activity-modal-info'>
                <div style={{color: "white"}}>
                    <p>Activity Name: {activityState.currentActivity.activityName}</p>
                    <p>Description: {activityState.currentActivity.description}</p>
                    <p>Activity Time: {`${activityState.currentActivity.activityTime}`}</p>
                </div>
                <ButtonGroup color="secondary" aria-label="medium secondary button group">
                    <Button onClick={deleteActivity}>Delete</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                </ButtonGroup>
            </div>
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
                    <List
                        sx={{
                            width: '100%',
                            height: "90%",
                            maxWidth: 360,
                            // bgcolor: 'background.paper',
                            position: 'relative',
                            // overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                          }}
                    >
                        {activityState.activities.map((ele)=>{
                            return (
                            <div key={Date.now().toString() + ele.activityId.toString()}>
                                {
                                    (new Date(ele.activityTime).getTime() - new Date().getTime() <= 604800000 &&  new Date(ele.activityTime).getTime() - new Date().getTime() > 0) ?
                                    <>
                                        <ListItem style={{backgroundColor: "rgba(12,41,41,0.7)", color: "white", cursor: "pointer"}} onClick={()=>openThirdModal(ele)}>
                                            <ListItemText primary={ele.activityName} />
                                        </ListItem>
                                        <ListItem onClick={()=>openThirdModal(ele)} style={{backgroundColor: "rgba(12,41,41,0.5)", color: "white", marginBottom: "3vh", cursor: "pointer"}}>
                                            <ListItemText primary={remainingDate(new Date(ele.activityTime).getTime() - new Date().getTime())} />
                                        </ListItem>
                                    </>
                                    :
                                    undefined
                                }
                                
                            </div>
                            )
                        })}
                        <div className='no-activity__add-button' onClick={openModal}
                            style={{margin: "3vh 0 0 43%"}}
                        >
                            <img src={img} alt="add item"></img>
                        </div>
                    </List>
            }
        </motion.div>
    </motion.div>
  )
}

export default Activities

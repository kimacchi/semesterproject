import React from 'react';
import {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../actions/index';
import img from "../../assets/add_button.png";
import Modal from "react-modal";
import {v4 as uuid} from "uuid";

const axios = require("axios");

Modal.setAppElement("#root")

const Projects = () => {
    const [projectState, setState] = useState({projects: [], currentUserId: undefined, currentProjectId: undefined, mouseEnter: {state: false, id: undefined}, projectName: "", modalIsOpen: false});
    const currentUserId = useSelector((state)=>state.currentUser.userId);
    const currentProject = useSelector((state)=>state.currentProject.projectId);
    const dispatch = useDispatch();
    const { setCurrentProject, setCurrentTodo } = bindActionCreators(actionCreators, dispatch);


    useEffect(()=>{
        setState(prev=>({...prev, currentUserId}))
    }, [currentUserId])

    useEffect(()=>{
        if(projectState.projects.length === 0){
            if(currentUserId !== undefined){
                axios.get(process.env.REACT_APP_API+"projects/" + currentUserId).then((data)=>{
                    setState((prev)=>({...prev, projects:[...data.data]}));
                })
            }
        }
    }, [currentProject])

    const setOnMouseEnter = (id)=>{
        setState(prev=>({...prev, mouseEnter: {state: true, id: id}}))
    }

    const setOnMouseLeave = ()=>{
        setState(prev=>({...prev, mouseEnter: {state: false, id: undefined}}))
    }

    const setCurrentProjectLocal = (projectId)=>{
        setState(prev=>({...prev, currentProjectId: projectId}));
        setCurrentProject(projectId);
        axios.get(process.env.REACT_APP_API+"projects/" + currentUserId).then((data)=>{
            data.data.map((ele)=>{
                if(ele.projectId === projectId){
                    // console.log(ele);
                    setCurrentTodo(projectId, ele.todoList);
                }
            })
        })
    }

    const delProject = (id)=>{
        axios.delete(process.env.REACT_APP_API+"projects/" + id).then(()=>{
            axios.get(process.env.REACT_APP_API+"projects/" + currentUserId).then((data)=>{
                setState((prev)=>({...prev, projects:[...data.data], currentProjectId: undefined}));
            })
        })
    }

    const openModal = ()=>{
        setState(prev=>({...prev, modalIsOpen: true}))
    }

    const closeModal = ()=>{
        setState(prev=>({...prev, modalIsOpen: false}))
    }

    const onTextChange = (e)=>{
        const text = e.target.value;
        setState(prev=>({...prev, projectName: text}));
    }

    const addProject = ()=>{
        if(projectState.projectName !== ""){
            axios.post(process.env.REACT_APP_API+"projects/", {projectName: projectState.projectName, userId: currentUserId, todoList: ";;"}).then(()=>{
                setState((prev)=>({...prev, projectName: "", modalIsOpen: false}));
                axios.get(process.env.REACT_APP_API+"projects/" + currentUserId).then((data)=>{
                    setState((prev)=>({...prev, projects:[...data.data]}));
                })
            })
            
        }
    }

  return (
    <div className='projects-list'>
        <p>Projects</p>
        <Modal
            className="projects-modal"
            isOpen={projectState.modalIsOpen}
            onRequestClose={closeModal}
        >
            <TextField id="standard-basic" label="Project Name *" variant="standard" style={{marginTop: "1vh"}} onChange={onTextChange} />
            <Button variant="contained" onClick={addProject}>Add</Button>
        </Modal>
        {
            projectState.projects.length === 0 ? 

            <div className='projects-list-no-projects'>
                <p>You have no projects, add some!</p>
                <div className='no-activity__add-button'
                    style={{margin: "3vh 0 0 0%"}}
                    onClick={openModal}
                >
                    <img src={img} alt="add item"></img>
                </div>
            </div>

            :

            <div className='projects-list__items'>
                
                <List
                        sx={{
                            width: '99%',
                            height: "92.4%",
                            maxWidth: 360,
                            // bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                          }}
                >
                    {
                        projectState.projects.map((ele)=>{
                            return(
                                <div 
                                    key={uuid()} 
                                    style={ele.projectId === projectState.currentProjectId ? 
                                        {marginLeft: 10, color: "white"} 
                                        : 
                                        {cursor: "pointer"}}
                                    // onClick={()=>setCurrentProjectLocal(ele.projectId)}
                                >
                                    <ListItem  onMouseEnter={()=>setOnMouseEnter(ele.projectId)} onMouseLeave={()=>setOnMouseLeave()}>
                                        <ListItemText primary={ele.projectName} onClick={()=>setCurrentProjectLocal(ele.projectId)}/>
                                        {
                                            projectState.mouseEnter.state === true && projectState.mouseEnter.id === ele.projectId ?
                                            <ListItemButton  style={{display: "flex", justifyContent: "flex-end", height: "100%", width: "0"}}>
                                                <Button variant="outlined" color="error" style={{height: "2.2vh"}} onClick={()=>delProject(ele.projectId)}>Delete</Button>
                                            </ListItemButton>
                                            :
                                            undefined
                                        }
                                    </ListItem>
                                </div>
                            )
                        })
                    }
                    <div className='no-activity__add-button'
                        style={{margin: "3vh 0 0 43%"}}
                        onClick={openModal}
                    >
                            <img src={img} alt="add item"></img>
                    </div>
                </List>
            </div>
        }
    </div>
  )
}

export default Projects
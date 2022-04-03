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

const axios = require("axios");

Modal.setAppElement("#root")

const Projects = () => {
    const [projectState, setState] = useState({projects: [], currentUserId: undefined, currentProjectId: undefined, mouseEnter: {state: false, id: undefined}, projectName: "", modalIsOpen: false});
    const currentUserId = useSelector((state)=>state.currentUser.userId);
    const currentProject = useSelector((state)=>state.currentProject);
    const dispatch = useDispatch();
    const { setCurrentProject } = bindActionCreators(actionCreators, dispatch);


    useEffect(()=>{
        setState(prev=>({...prev, currentUserId}))
    }, [currentUserId])

    if(projectState.projects.length === 0){
        if(projectState.currentUserId !== undefined){
            axios.get("http://localhost:5000/api/projects/" + projectState.currentUserId).then((data)=>{
                setState((prev)=>({...prev, projects:[...data.data]}));
            })
        }
    }

    const setOnMouseEnter = (id)=>{
        setState(prev=>({...prev, mouseEnter: {state: true, id: id}}))
    }

    const setOnMouseLeave = ()=>{
        setState(prev=>({...prev, mouseEnter: {state: false, id: undefined}}))
    }

    const setCurrentProjectLocal = (projectId)=>{
        setTimeout(()=>{
            axios.get("http://localhost:5000/api/todo/" + projectId).then((data)=>{
                if(data.data.length === 0){
                    axios.post("http://localhost:5000/api/todo/", {userId: projectState.currentUserId, list: "", projectId: projectId})
                }
            });
        }, 500);
        setState(prev=>({...prev, currentProjectId: projectId}));
        setCurrentProject(projectId);
    }

    const delProject = (id)=>{
        axios.delete("http://localhost:5000/api/projects/" + id).then(()=>{
            axios.delete("http://localhost:5000/api/todo/" + id);
            axios.get("http://localhost:5000/api/projects/" + projectState.currentUserId).then((data)=>{
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
            axios.post("http://localhost:5000/api/projects/", {projectName: projectState.projectName, userId: projectState.currentUserId}).then(()=>{
                setState((prev)=>({...prev, projectName: "", modalIsOpen: false}));
                axios.get("http://localhost:5000/api/projects/" + projectState.currentUserId).then((data)=>{
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
                                    key={ele.projectId + new Date().getTime()} 
                                    style={ele.projectId === projectState.currentProjectId ? 
                                        {marginLeft: 10, color: "white"} 
                                        : 
                                        {cursor: "pointer"}}
                                    onClick={()=>setCurrentProjectLocal(ele.projectId)}
                                >
                                    <ListItem onClick={()=>setCurrentProjectLocal(ele.projectId)} onMouseEnter={()=>setOnMouseEnter(ele.projectId)} onMouseLeave={()=>setOnMouseLeave()}>
                                        <ListItemText primary={ele.projectName}/>
                                        {
                                            projectState.mouseEnter.state === true && projectState.mouseEnter.id === ele.projectId ?
                                            <ListItemButton onClick={()=>delProject(ele.projectId)} style={{display: "flex", justifyContent: "flex-end", height: "100%", width: "0"}}>
                                                <Button variant="outlined" color="error" style={{height: "2.2vh"}}>Delete</Button>
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
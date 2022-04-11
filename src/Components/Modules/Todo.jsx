import React, {useState, useEffect} from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import img from "../../assets/add_button.png";
import Modal from "react-modal";
import { convertToList, convertToString } from '../../functions/todoList';

// the portion should be as follows:
// [items seperated by comma];[items seperated by comma];[items seperated by comma]
// if one column is empty, simply leave it alone.


const axios = require("axios");

Modal.setAppElement("#root");

// fake data

const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
  ];
  
  const columnsFromBackend = {
    todoColumn: {
      name: "To do",
      items: itemsFromBackend
    },
    progressColumn: {
      name: "In Progress",
      items: []
    },
    doneColumn: {
      name: "Done",
      items: []
    }
  };

//---
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      console.log(column);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    };

  };



const Todo = () => {
    const [columns, setColumns] = useState({
      todoColumn: {
        name: "To do",
        items: []
      },
      progressColumn: {
        name: "In Progress",
        items: []
      },
      doneColumn: {
        name: "Done",
        items: []
      }
    });
    const currentProject = useSelector((state)=>state.currentProject.projectId);
    const currentUser = useSelector((state)=>state.currentUser.userId);
    const currentTodo = useSelector((state)=>state.currentTodo);
    const [todoState, setState] = useState({currentProjectId: undefined, currentUserId: undefined, currentList: undefined, modalIsOpen: false, addingTo: undefined})
    
    useEffect(()=>{
      setState((prev)=>({...prev, currentProjectId: currentProject}))
    }, [currentProject])

    useEffect(()=>{
      console.log(currentTodo);
      if(currentTodo.todoList !== undefined){
        var convertedList = convertToList(currentTodo.todoList);
        setColumns(()=>({
                        todoColumn: {name: "To do", items: convertedList[0]},
                        progressColumn: {name: "In Progress", items: convertedList[1]},
                        doneColumn: {name: "Done", items: convertedList[2]}
                        }))
      }
    }, [currentTodo])

    useEffect(()=>{
      setState((prev)=>({...prev, currentUserId: currentUser}))
    }, [currentUser])

    useEffect(()=>{
      var tempString = convertToString(columns.todoColumn.items, columns.progressColumn.items, columns.doneColumn.items)
      console.log(tempString, currentProject);
      if(currentProject !== undefined){
        axios.put("http://localhost:5000/api/projects/"+ currentProject, {todoList: tempString});
      }
    }, [columns])

    const openModal = (columnId)=>{
      setState((prev)=>({...prev, modalIsOpen: true, addingTo: columnId}));
    }

    const closeModal = ()=>{
      setState((prev)=>({...prev, modalIsOpen: false, addingTo: undefined}));
    }

    const delItem = (id)=>{
      var todoRemovedIndex;
      var progressRemovedIndex;
      var doneRemovedIndex;
      columns.todoColumn.items.map((ele, index)=>{
        if(ele.id === id){
          todoRemovedIndex = index;
        }
      })
      columns.progressColumn.items.map((ele, index)=>{
        if(ele.id === id){
          progressRemovedIndex = index;
        }
      })
      columns.doneColumn.items.map((ele, index)=>{
        if(ele.id === id){
          doneRemovedIndex = index;
        }
      })
      if(todoRemovedIndex !== undefined){
        var temp = [...columns.todoColumn.items]
        temp.splice(todoRemovedIndex, 1);
        setColumns(prev=>({...prev, todoColumn: {name: "To do", items: temp}}))
        todoRemovedIndex = undefined;
      }
      else if(progressRemovedIndex !== undefined){
        var temp = [...columns.progressColumn.items]
        temp.splice(progressRemovedIndex, 1);
        setColumns(prev=>({...prev, progressColumn: {name: "In Progress", items: temp}}))
        progressRemovedIndex = undefined;
      }
      else if(doneRemovedIndex !== undefined){
        var temp = [...columns.doneColumn.items]
        temp.splice(doneRemovedIndex, 1);
        setColumns(prev=>({...prev, doneColumn: {name: "Done", items: temp}}))
        doneRemovedIndex = undefined;
      }
    }


    return (
      <div style={{ display: "flex", justifyContent: "center", height: "100%", backgroundColor: "rgba(11,50,55,0.5)", borderRadius: "15px" }}>
        <Modal
            className="projects-modal"
            isOpen={todoState.modalIsOpen}
            onRequestClose={closeModal}
        >
            {/* <TextField id="standard-basic" label="Name of task*" variant="standard" style={{marginTop: "1vh"}} onChange={onTextChange} /> */}
            {/* <Button variant="contained" onClick={addTask}>Add</Button> */}
        </Modal>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
                key={columnId}
              >
                <div style={{ margin: 0 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                backgroundColor: snapshot.isDraggingOver
                                ? "rgba(12,41,41,0.5)"
                                : "rgba(12,41,41,0.3)",
                                padding: 8,
                                width: "21vw",
                                borderRadius: "15px",
                                minHeight: "54vh",
                                maxHeight: "54vh",
                                overflowY: "auto",
                                overflowX: "hidden",
                            }}
                            >
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontFamily: "Oxygen",
                                        fontSize: "20px",
                                        color: "#80afba"
                                    }}
                                >{column.name}</p>
                          {column.items.map((item, index) => {
                              return (
                                <div key={uuid()}>
                                {
                                  item.content === "" ?
                                  <span key={item.id}></span>

                                  :

                                  <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                  
                                  >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "rgba(4, 23, 36, 0.5)"
                                          : "rgba(7, 32, 36, 0.3)",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                      }}
                                      // onMouseEnter={()=>setOnMouseEnter(item.id)} 
                                      // onMouseLeave={()=>setOnMouseLeave()}
                                      // onClick={delItem(item.id)}
                                    >
                                      <p>{item.content}</p>
                                      <Button color='error' onClick={()=>delItem(item.id)}>Delete</Button>
                                      
                                    </div>
                                  );
                                }}
                              </Draggable>
                              
                                }
                                </div>
                            );
                          })}

                          {
                            currentProject === undefined ? 
                            undefined
                            :
                            <div 
                              className='no-activity__add-button'
                              style={{margin: "3vh 0 0 43%"}}
                              onClick={()=>openModal(columnId)}
                            >
                              <img src={img} alt="add item"></img>
                            </div>
                          }
                          
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    );
}

export default Todo;
import React, {useState, useEffect} from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import img from "../../assets/add_button.png";
import Modal from "react-modal";

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
    todo: {
      name: "To do",
      items: itemsFromBackend
    },
    progress: {
      name: "In Progress",
      items: []
    },
    done: {
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
    const [todoState, setState] = useState({currentProject: undefined, currentUser: undefined, currentTodoList: undefined, mouseEnter: {state: false, id: undefined}, modalIsOpen: false, todoName: undefined, addingTo: undefined, currentTodoId: -10});
    const currentProjectGlobal = useSelector((state)=>state.currentProject.projectId);
    const currentUserGlobal = useSelector((state)=>state.currentUser.userId);
    const projectCache = [];

    useEffect(()=>{
      axios.get("http://localhost:5000/api/todo/" + currentProjectGlobal).then((data)=>{
        console.log(data.data);
        if(data.data.length !== 0){
          setState(prev=>({...prev, currentTodoId: data.data[0].todoId}));
        }
      })
    }, [currentProjectGlobal])

    useEffect(()=>{
        setState(prev => ({...prev, currentProject: currentProjectGlobal}))
    }, [currentProjectGlobal]);

    // if(todoState.currentUser === undefined && currentUserGlobal !== undefined){
    //     setState(prev => ({...prev, currentUser: currentUserGlobal}))
    // }
    // console.log(todoState.currentProject);

    useEffect(()=>{


      if(todoState.currentProject !== undefined){
        axios.get("http://localhost:5000/api/todo/" + currentProjectGlobal).then((data)=>{
          console.log(data.data);
          if(data.data.length !== 0){
            setState(prev=>({...prev, currentTodoList: data.data[0].list}));
          }
        })
      }
    }, [currentProjectGlobal]);


    useEffect(()=>{
      if(todoState.currentTodoList !== undefined){
        const tempArr = todoState.currentTodoList.split(";");
        const todoTemp = tempArr[0].split(",");
        const progressTemp = tempArr[1].split(",");
        const doneTemp = tempArr[2].split(",");
        // console.log(todo, progress, done);
        var todo = [];
        for(let i = 0; i < todoTemp.length; i++){
          todo.push({ id: uuid(), content: todoTemp[i]})
        }
        var progress = [];
        for(let i = 0; i < progressTemp.length; i++){
          progress.push({ id: uuid(), content: progressTemp[i]})
        }
        var done = [];
        for(let i = 0; i < doneTemp.length; i++){
          done.push({ id: uuid(), content: doneTemp[i]})
        }
        setColumns((prev)=>({...prev, todoColumn: {name: "To do", items: todo}, progressColumn: {name: "In Progress", items: progress}, doneColumn: {name: "Done", items: done}}))
      }
    }, [todoState.currentTodoList]);

    useEffect(()=>{
            
      var tempTodo = [];
      for(let i = 0; i < columns.todoColumn.items.length; i++){
        tempTodo.push(columns.todoColumn.items[i].content);
      }
      var tempProgress = [];
      for(let i = 0; i < columns.progressColumn.items.length; i++){
        tempProgress.push(columns.progressColumn.items[i].content);
      }
      var tempDone = [];
      for(let i = 0; i < columns.doneColumn.items.length; i++){
        tempDone.push(columns.doneColumn.items[i].content);
      }
      const todoTempStr = tempTodo.join(",");
      const progressTempStr = tempProgress.join(",");
      const doneTempStr = tempDone.join(",");
      const updatedList = `${todoTempStr !== undefined ? todoTempStr : ""};${progressTempStr !== undefined ? progressTempStr : ""};${doneTempStr !== undefined ? doneTempStr : ""}`;
      if(currentProjectGlobal !== undefined && currentProjectGlobal === todoState.currentProject){
        axios.put("http://localhost:5000/api/todo/" + currentProjectGlobal, {list: updatedList, todoId: todoState.currentTodoId}).then(()=>{
          axios.get("http://localhost:5000/api/todo/" + currentProjectGlobal).then((data)=>{
            console.log(data.data[0].list);
            setState(prev=>({...prev, currentTodoList: data.data[0].list}));
        })
        })
      }
    }, [columns])

    const setOnMouseEnter = (id)=>{
      setState(prev=>({...prev, mouseEnter: {state: true, id: id}}))
    }

    const setOnMouseLeave = ()=>{
      setState(prev=>({...prev, mouseEnter: {state: false, id: undefined}}))
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
        const temp = [...columns.todoColumn.items]
        temp.splice(todoRemovedIndex, 1);
        setColumns(prev=>({...prev, todoColumn: {name: "To do", items: temp}}))
        todoRemovedIndex = undefined;
      }
      else if(progressRemovedIndex !== undefined){
        const temp = [...columns.progressColumn.items]
        temp.splice(progressRemovedIndex, 1);
        setColumns(prev=>({...prev, progressColumn: {name: "In Progress", items: temp}}))
        progressRemovedIndex = undefined;
      }
      else if(doneRemovedIndex !== undefined){
        const temp = [...columns.doneColumn.items]
        temp.splice(doneRemovedIndex, 1);
        setColumns(prev=>({...prev, doneColumn: {name: "Done", items: temp}}))
        doneRemovedIndex = undefined;
      }
      axios.get("http://localhost:5000/api/todo/" + currentProjectGlobal).then((data)=>{
          console.log(data.data);
          setState(prev=>({...prev, currentTodoList: data.data[0].list}));
      })
    }

    const openModal = (columnId)=>{
      console.log(columnId);
      setState(prev=>({...prev, modalIsOpen: true, addingTo: columnId}))
    }

    const closeModal = ()=>{
      setState(prev=>({...prev, modalIsOpen: false}))
    }

    const onTextChange = (e)=>{
      const text = e.target.value;
      setState(prev=>({...prev, todoName: text}));
    }

    const addTask = ()=>{
      var tempTodo = [];
      for(let i = 0; i < columns.todoColumn.items.length; i++){
        tempTodo.push(columns.todoColumn.items[i].content);
      }
      var tempProgress = [];
      for(let i = 0; i < columns.progressColumn.items.length; i++){
        tempProgress.push(columns.progressColumn.items[i].content);
      }
      var tempDone = [];
      for(let i = 0; i < columns.doneColumn.items.length; i++){
        tempDone.push(columns.doneColumn.items[i].content);
      }
      if(todoState.addingTo === "todoColumn"){
        tempTodo.push(todoState.todoName);
      }
      else if(todoState.addingTo === "progressColumn"){
        tempProgress.push(todoState.todoName);
      }
      else if(todoState.addingTo === "doneColumn"){
        tempDone.push(todoState.todoName);
      }
      const todoTempStr = tempTodo.join(",");
      const progressTempStr = tempProgress.join(",");
      const doneTempStr = tempDone.join(",");
      const updatedList = `${todoTempStr !== undefined ? todoTempStr : ""};${progressTempStr !== undefined ? progressTempStr : ""};${doneTempStr !== undefined ? doneTempStr : ""}`;
      if(todoState.currentProject !== undefined){
        axios.put("http://localhost:5000/api/todo/" + currentProjectGlobal, {list: updatedList, todoId: todoState.currentTodoId}).then(()=>{
          axios.get("http://localhost:5000/api/todo/" + currentProjectGlobal).then((data)=>{
          setState(prev=>({...prev, currentTodoList: data.data[0].list, modalIsOpen: false}));
        })
        })
      }
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", height: "100%", backgroundColor: "rgba(11,50,55,0.5)", borderRadius: "15px" }}>
        <Modal
            className="projects-modal"
            isOpen={todoState.modalIsOpen}
            onRequestClose={closeModal}
        >
            <TextField id="standard-basic" label="Name of task*" variant="standard" style={{marginTop: "1vh"}} onChange={onTextChange} />
            <Button variant="contained" onClick={addTask}>Add</Button>
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
                                      onMouseEnter={()=>setOnMouseEnter(item.id)} 
                                      onMouseLeave={()=>setOnMouseLeave()}
                                    >
                                      <p>{item.content}</p>
                                      {
                                        todoState.mouseEnter.id === item.id && todoState.mouseEnter.state === true ?
                                        <Button color='error' onClick={()=>delItem(item.id)}>Delete</Button>
                                        :
                                        undefined
                                      }
                                    </div>
                                  );
                                }}
                              </Draggable>
                              
                                }
                                </div>
                            );
                          })}
                          <div className='no-activity__add-button'
                            style={{margin: "3vh 0 0 43%"}}
                            onClick={()=>openModal(columnId)}
                          >
                            <img src={img} alt="add item"></img>
                          </div>
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
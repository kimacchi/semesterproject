import React, {useState} from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";

// fake data



//---
const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
  ];
  
  const columnsFromBackend = {
    [uuid()]: {
      name: "To do",
      items: itemsFromBackend
    },
    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Done",
      items: []
    }
  };
  
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
    }
  };



const Todo = () => {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
      <div style={{ display: "flex", justifyContent: "center", height: "100%", backgroundColor: "rgba(11,50,55,0.5)", borderRadius: "15px" }}>
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
                {/* <p>{column.name}</p> */}
                <div style={{ margin: 0 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver
                                ? "rgba(12,41,41,0.5)"
                                : "rgba(12,41,41,0.3)",
                                padding: 8,
                                width: "21vw",
                                borderRadius: "15px",
                                minHeight: "54vh",
                                maxHeight: "54vh",
                                overflowY: "auto",
                                overflowX: "hidden",
                                backgroundColor: "rgba(12,41,41,0.3)",
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
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                      
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
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



// const fakeItems = [
//     {
//         id: uuid(),
//         content: "first task"
//     },
//     {
//         id: uuid(),
//         content: "second task"
//     },
// ]

// const fakeColumns = {
//     [uuid()]: {
//         name: "todo",
//         items: fakeItems
//     }
// }

// const [columns, setColumns] = useState(fakeColumns);


// const onDragEnd=(result)=>{
//     if(!result.destination) return;
//     const {source, destination} = result;
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//         ...columns,
//         [source.droppableId]: {
//             ...column,
//             items: copiedItems
//         }
//     })
// }


// return (
// <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
//     <DragDropContext onDragEnd={result => onDragEnd(result)}>
//         {Object.entries(columns).map(([id, column])=>{
//             return(
//                 <Droppable droppableId={id} key={id}>
//                     {(provided, snapshot)=>{
//                         return(
//                             <div
//                                 {...provided.droppableProps}
//                                 ref={provided.innerRef}
//                                 key={uuid()}
//                                 style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, width: 250}}
//                             >
//                                 {column.items.map((item, index)=>{
//                                     return (
//                                         <Draggable key={item.id} draggableId={item.id} index={index}>
//                                             {(provided, snapshot)=>{
//                                                 return (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         key={uuid()}
//                                                         style={{
//                                                             userSelect: "none",
//                                                             padding: 16,
//                                                             margin: "0 0 8px 0",
//                                                             minHeight: "50px",
//                                                             backgroundColor: snapshot.isDragging ? "#263b4a" : "#456c86",
//                                                             color: "white",
//                                                             ...provided.draggableProps.style
//                                                         }}
//                                                     >
//                                                         {item.content}
//                                                     </div>
//                                                 )
//                                             }}
//                                         </Draggable>
//                                     )
//                                 })}
//                             </div>
//                         )
//                     }}
//                 </Droppable>
//             )
//         })}
//     </DragDropContext>
// </div>
// )
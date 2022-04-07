import {v4 as uuid} from "uuid";

export const convertToList = (stringList)=>{
    var collectedColumns = stringList.split(";");
    var todoColumnTemplate = collectedColumns[0];
    var progressColumnTemplate = collectedColumns[1];
    var doneColumnTemplate = collectedColumns[2];
    var todoColumn = [];
    var progressColumn = [];
    var doneColumn = [];
    for(let i = 0; i < todoColumnTemplate.length; i++){
        if(todoColumnTemplate[i] !== ""){
            todoColumn.push({content: todoColumnTemplate[i], id: uuid()});
        }
    }
    for(let i = 0; i < progressColumnTemplate.length; i++){
        if(progressColumnTemplate[i] !== ""){
            progressColumn.push({content: progressColumnTemplate[i], id: uuid()});
        }
    }
    for(let i = 0; i < doneColumnTemplate.length; i++){
        if(doneColumnTemplate[i] !== ""){
            doneColumn.push({content: doneColumnTemplate[i], id: uuid()});
        }
    }
    return [todoColumn, progressColumn, doneColumn];
}

export const convertToString = (todoColumn, progressColumn, doneColumn)=>{
    var todoString;
    var progressString;
    var doneString;
    if(todoColumn.length !== 0){
        todoString = todoColumn.join(",");
    }else{
        todoString = "";
    }
    if(progressColumn.length !== 0){
        progressString = progressColumn.join(",");
    }else{
        progressString = "";
    }
    if(doneColumn.length !== 0){
        doneString = doneColumn.join(",");
    }else{
        doneString = "";
    }
    return `${todoString};${progressString};${doneString}`;
}
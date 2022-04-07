import {v4 as uuid} from "uuid";

export const convertToList = (stringList)=>{
    var collectedColumns = stringList.split(";");
    var todoColumnTemplate = collectedColumns[0].split(",");
    var progressColumnTemplate = collectedColumns[1].split(",");
    var doneColumnTemplate = collectedColumns[2].split(",");
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
    if(todoColumn.length > 1){
        var temp = [];
        for(let i = 0; i < todoColumn.length; i++){
            temp.push(todoColumn[i].content);
        }
        todoString = temp.join(",");
    }else{
        if(todoColumn.length === 0){
            todoString = "";
        }else{
            todoString = todoColumn[0].content;
        }
    }
    if(progressColumn.length !== 0){
        var temp = [];
        for(let i = 0; i < progressColumn.length; i++){
            temp.push(progressColumn[i].content);
        }
        progressString = temp.join(",");
    }else{
        if(progressColumn.length === 0){
            progressString = "";
        }else{
            progressString = progressColumn[0].content;
        }
    }
    if(doneColumn.length !== 0){
        var temp = [];
        for(let i = 0; i < doneColumn.length; i++){
            temp.push(doneColumn[i].content);
        }
        doneString = temp.join(",");
    }else{
        if(todoColumn.length === 0){
            doneString = "";
        }else{
            doneString = doneColumn[0].content;
        }
    }
    return `${todoString};${progressString};${doneString}`;
}
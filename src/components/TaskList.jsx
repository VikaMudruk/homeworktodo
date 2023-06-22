import React, {useEffect, useState} from "react";

export function TaskList(props){

    const[action, setAction] = useState({action: "none", id: 0, status: false});

    function checkCompleteState(action){
        if (action.action == "complete"){
            for(let i = 0; i < props.taskList.length; i++){
                if(props.taskList[i].id == action.id){
                    props.taskList[i].status = action.status;
                    setAction(action); //set component's useState
                    return;
                }
            }
        }
    }

    useEffect(() => {
        if(action.action == "edit" || action.action == "delete"){
            for(let i = 0; i < props.taskList.length; i++){
                if(props.taskList[i].id == action.id){
                    if(action.status){
                        props.setEditState({idToEdit: i, isEditing: true});
                    }else{
                        props.setEditState({idToEdit: 0, isEditing: false});
                        props.setTaskList(props.taskList.filter(task => task.id !== action.id)); // delete a task
                    }
                    return;
                }
            }
        }else if(action.action == "complete"){
            let buffer = props.taskList;
            for(let i = 0; i < buffer.length; i++){
                if(buffer[i].id == action.id){
                    buffer[i].status = action.status;
                    props.setTaskList(buffer);
                    return;
                }
            }
        }
    }, [action]);


    const tasksList = props.taskList.map(task =>
        <li key={task.id} className="list-item">
            <table>
                <tbody>
                    <tr>
                        <td rowSpan={4}><input type="checkbox" className="td-checkbox" onChange={e => checkCompleteState({action: "complete", id: task.id, status: e.target.checked})}></input></td>
                        <td colSpan={2} className="td-title" style={task.status ? {textDecoration: "line-through"} : {"":""}}>{task.title}</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className="td-description"><p>{task.description}</p></td>
                        <td><button className="edit-button" onClick={e => setAction({action: "edit", id: task.id, status: true})}>EDIT</button></td>
                    </tr>
                    <tr>
                        <td><button className="delete-button" onClick={e => setAction({action: "delete", id: task.id, status: false})}>DELETE</button></td>
                    </tr>
                    <tr>
                        <td>{"Date: " + task.date.getDate() + "." + (task.date.getMonth()+1) + "." + task.date.getFullYear() + 
                        " , " + task.date.getHours() + ":" + task.date.getMinutes()+ ":" + task.date.getSeconds()}</td>
                    </tr>
                </tbody>
            </table>
        </li>
        );

    return(
        <ul>{tasksList}</ul>
    )
}

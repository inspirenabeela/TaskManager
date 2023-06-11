import { useState } from "react";
import './style.css';

function Taskmanager(){
let [inputValue,setInputValue] = useState("");
const [tasks,setTasks] = useState([]);


function addTask(){
    if(inputValue.length === 0){
        return;
    }
    setTasks([...tasks,
        {
            content: inputValue,
            iscomplete: false,
            isEditing: false
        }
    ]);
    setInputValue("")
}
function deleteTask(taskIndex){
    tasks.splice(taskIndex,1)
  setTasks(
   [...tasks]
    )
  
}
function markcompleted(taskIndex){
tasks[taskIndex].iscomplete = !tasks[taskIndex].iscomplete;
setTasks([...tasks])
}
function editTask(taskIndex){
    tasks[taskIndex].isEditing = true;
    setTasks(
        [...tasks]
    )
}
function updatevalue(taskIndex,value){
     tasks[taskIndex].content = value;
    setTasks(
        [...tasks]
    )
}
function savetask(taskIndex){
    tasks[taskIndex].isEditing = false;
    setTasks(
        [...tasks]
    )
}


    return(
        <div className="task-manager">
            <h1>Task Manager</h1>
           <div className="tasks">
                {
                    tasks.sort((a)=>a.iscomplete ? 1 : -1).map(
                        (task, index)=>  <div key={index} className={"task " + (task.iscomplete?"completed":"incomplete")}>
                            <input type="checkbox" checked={task.iscomplete}  onChange={()=>markcompleted(index)}/>
                          {
                               task.isEditing ?
                                <input value={task.content} onChange={(event)=>updatevalue(index,event.target.value)} className="edit-input"/>:
                                 <span className="content">
                                {
                                 task.iscomplete?
                                 <del>{task.content}</del>:
                                 task.content 
                                }
                                </span>
                          }
                          {    
                              task.isEditing ?
                            <button onClick={()=>savetask(index)} className="save">save</button>:
                            <button onClick={()=>editTask(index)} className="edit">edit</button>

                          }
                          
                            <button onClick={()=>deleteTask(task)} className="delete">Delete</button>
                            </div>
                    )
                }
            </div>
            <div className="addtask-container">
                <input value={inputValue} onChange={(event)=>setInputValue(event.target.value)} placeholder="enter a task"/>
                <button onClick={addTask}>add</button>
            </div>

        </div>
    );
}


export default Taskmanager;
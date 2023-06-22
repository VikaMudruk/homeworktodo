import { useState } from 'react'
import './App.css'
import { TaskList } from './components/TaskList.jsx'
import { TaskForm } from './components/TaskForm.jsx'



function App() {
  const [taskList, setTaskList] = useState([]);
  const [editState, setEditState] = useState({idToEdit: 0, isEditing: false});

  return (
    <div>
      <h2>My Plans:</h2>

      <TaskForm setTaskList={setTaskList}  editState={editState} setEditState={setEditState} taskList={taskList}/>

      <TaskList taskList={taskList} setTaskList={setTaskList} setEditState={setEditState}/>
    </div>
  )
}

export default App

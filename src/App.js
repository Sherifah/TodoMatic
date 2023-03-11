import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App() {

  const [tasks, setTasks] = useState([])

  const [filter, setFilter] = useState("All")

  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => {
      return (
        <Todo 
          id={task.id}
          name={task.name}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask} />
      )
    })

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={ name === filter} setFilter={setFilter} />
  ))


  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  const todoNoun = taskList.length > 1 ? 'tasks' : 'task';
  const todoHeading = taskList.length === 0 ? 
                'You have no tasks': 
                `${taskList.length} ${todoNoun} remaining`;

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      } 
      return task;
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id )
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList);
  }

  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form 
         addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{todoHeading}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;

/*<div className="no-tasks">
        <h3>You have no tasks</h3>
        <button 
            className="first-task" 
            onClick={addTask}
        >
            Add New Note
        </button>
    </div>*/

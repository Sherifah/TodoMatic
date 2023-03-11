import React, {useState} from "react";

function Todo(props) {

    const [isEditing, setIsEditing] = useState(false)

    const [newName, setNewName] = useState("")

    function handleChange(e) {
      setNewName(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName)
      setIsEditing(false)
      setNewName('')
    }

    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
    )

    const defaultTemplate = (
      <div className="todo stack-small">
          <div className="c-cb">
            <input 
              id={props.id} 
              type="checkbox"
              name={props.name}
              onChange={() => props.toggleTaskCompleted(props.id)}
              defaultChecked={props.completed}
              />
            <label className="todo-label" htmlFor="0">
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setIsEditing(true)}>
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </div>
    )

    return(
        <li className="todo">
           {isEditing ? editingTemplate : defaultTemplate}
        </li>
    )
}

export default Todo;

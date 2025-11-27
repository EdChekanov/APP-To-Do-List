import { useContext, useState, useRef } from 'react';
import ToDoContext from '../Context';
import TaskEditMode from './TaskEditMode';

const Task = ({ task }) => {
  const { setTasks } = useContext(ToDoContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const inputRef = useRef(null);

  const handleClickEdit = (id, newTitle, ref) => {
    if (newTitle.trim().length) {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id) return { ...task, title: newTitle };
          return task;
        })
      );
      setIsEdit((v) => !v);
    } else {
      ref.current.querySelector('input').style.backgroundColor = 'tomato';
    }
  };

  const handleClickComplete = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleClickDelete = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <input
        id={task.id}
        type="checkbox"
        onChange={() => handleClickComplete(task.id)}
        checked={task.isDone}
      />
      <label
        ref={inputRef}
        className={task.isDone ? 'done' : ''}
        htmlFor={task.id}
      >
        {isEdit ? (
          <TaskEditMode
            editText={editText}
            setEditText={setEditText}
            handleClickEdit={handleClickEdit}
            task={task}
            setIsEdit={setIsEdit}
            inputRef={inputRef}
          />
        ) : (
          <p>{task.title}</p>
        )}
      </label>
      <div className="task-btns">
        {isEdit ? (
          <button onClick={() => handleClickEdit(task.id, editText, inputRef)}>
            &#10003;
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)}>&#x270E;</button>
        )}
        <button onClick={() => handleClickDelete(task.id)}>X</button>
      </div>
    </>
  );
};

export default Task;

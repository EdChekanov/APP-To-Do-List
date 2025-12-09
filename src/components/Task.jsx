import { useContext, useState, useRef } from 'react';
import ToDoContext from '../Context';
import TaskEditMode from './TaskEditMode';
import useClickOutside from '../hooks/useClickOutside ';

const Task = ({ task }) => {
  const { handleComplete, handleDelete, handleEdit } = useContext(ToDoContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const inputRef = useRef(null);

  const handleClickEdit = (id, newTitle, ref) => {
    if (!newTitle.trim()) {
      ref.current.querySelector('input').style.backgroundColor = 'tomato';
      return;
    }
    handleEdit(id, newTitle);
    setIsEdit((v) => !v);
  };

  const onCancelClick = () => {
    setEditText(task.title);
    setIsEdit(false);
  };

  const ref = useClickOutside(() => onCancelClick());

  return (
    <li className="task-item" ref={ref}>
      <input
        id={task.id}
        type="checkbox"
        onChange={() => handleComplete(task.id)}
        checked={task.isCompleted}
      />
      <label
        ref={inputRef}
        className={task.isCompleted ? 'done' : ''}
        htmlFor={task.id}
      >
        {isEdit ? (
          <TaskEditMode
            editText={editText}
            setEditText={setEditText}
            handleClickEdit={handleClickEdit}
            taskId={task.id}
            setIsEdit={setIsEdit}
            inputRef={inputRef}
            onCancelClick={onCancelClick}
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
        <button onClick={() => handleDelete(task.id)}>X</button>
      </div>
    </li>
  );
};

export default Task;

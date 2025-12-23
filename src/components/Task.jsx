import { useState, useRef } from 'react';
import TaskEditMode from './TaskEditMode';
import useClickOutside from '../hooks/useClickOutside ';
import { useDispatch } from 'react-redux';
import {
  switchCompleteStatus,
  editTaskTitle,
  deleteTask,
} from '../redux/api/tasksApi';

const Task = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleClickEdit = (id, newTitle, ref) => {
    if (newTitle.trim().length) {
      dispatch(editTaskTitle({ id: id, newTitle: newTitle }));
      setIsEdit((v) => !v);
    } else {
      ref.current.querySelector('input').style.backgroundColor = 'tomato';
    }
  };

  const handleClickComplete = (id) => {
    dispatch(switchCompleteStatus(id));
  };

  const handleClickDelete = (id) => {
    dispatch(deleteTask(id));
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
        onChange={() => handleClickComplete(task.id)}
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
            task={task}
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
        <button onClick={() => handleClickDelete(task.id)}>X</button>
      </div>
    </li>
  );
};

export default Task;

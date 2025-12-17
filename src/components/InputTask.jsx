import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, clear } from '../redux/slices/inputTextSlice';
import { addNewTask } from '../redux/slices/tasksSlice';

const InputTask = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { value: inputText } = useSelector((store) => store.inputText);

  const handleClick = () => {
    if (!inputText.trim()) {
      inputRef.current.style.backgroundColor = 'tomato';
      dispatch(clear());
      return;
    }
    dispatch(addNewTask(inputText));
    dispatch(clear());
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        onChange={(e) => dispatch(change(e.target.value))}
        onFocus={() => (inputRef.current.style.backgroundColor = 'field')}
        type="text"
        name="task"
      />
      <button className="add-btn" onClick={handleClick}>
        Добавить
      </button>
    </div>
  );
};

export default InputTask;

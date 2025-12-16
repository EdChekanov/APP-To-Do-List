import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE, CLEAR } from '../redux/slices/inputTextSlice';
import { ADD_NEW_TASK } from '../redux/slices/tasksSlice';

const InputTask = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { value: inputText } = useSelector((store) => store.inputText);

  const handleClick = () => {
    if (!inputText.trim()) {
      inputRef.current.style.backgroundColor = 'tomato';
      dispatch(CLEAR());
      return;
    }
    dispatch(ADD_NEW_TASK(inputText));
    dispatch(CLEAR());
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        onChange={(e) => dispatch(CHANGE(e.target.value))}
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

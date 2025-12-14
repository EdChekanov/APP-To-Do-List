import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const InputTask = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputText = useSelector((store) => store.inputText.value);

  const handleClick = () => {
    if (!inputText.trim()) {
      inputRef.current.style.backgroundColor = 'tomato';
      dispatch({ type: 'clear' });
      return;
    }
    dispatch({ type: 'add new task', payload: inputText });
    dispatch({ type: 'clear' });
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        onChange={(e) => dispatch({ type: 'change', payload: e.target.value })}
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

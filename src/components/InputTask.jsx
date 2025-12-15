import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const InputTask = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { value: inputText } = useSelector((store) => store.inputText);

  const handleClick = () => {
    if (!inputText.trim()) {
      inputRef.current.style.backgroundColor = 'tomato';
      dispatch({ type: 'CLEAR' });
      return;
    }
    dispatch({ type: 'ADD_NEW_TASK', payload: inputText });
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        onChange={(e) => dispatch({ type: 'CHANGE', payload: e.target.value })}
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

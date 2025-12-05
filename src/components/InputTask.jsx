import { useContext, useRef, useState } from 'react';
import ToDoContext from '../Context';

const InputTask = () => {
  const inputRef = useRef(null);
  const { handleAddTask } = useContext(ToDoContext);
  const [inputText, setInputText] = useState('');

  const handleClick = async () => {
    if (!inputText.trim()) {
      inputRef.current.style.backgroundColor = 'tomato';
      setInputText('');
      return;
    }
    await handleAddTask(inputText);
    setInputText('');
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => (e.key === 'Enter' ? handleClick() : undefined)}
        onChange={(e) => setInputText(e.target.value)}
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

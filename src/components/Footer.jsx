import { useContext } from 'react';
import ToDoContext from '../Context';

const Footer = () => {
  const { tasks, handleDeleteCompleted } = useContext(ToDoContext);

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isCompleted).length}</p>
      <button className="footer-btn" onClick={handleDeleteCompleted}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;

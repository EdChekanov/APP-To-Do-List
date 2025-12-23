import { useDispatch, useSelector } from 'react-redux';
import { deleteCompletedTasks } from '../redux/api/tasksApi';

const Footer = () => {
  const { value: tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteCompletedTasks());
  };

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isCompleted).length}</p>
      <button className="footer-btn" onClick={handleClick}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;

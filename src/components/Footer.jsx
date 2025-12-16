import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COMPLETED_TASKS } from '../redux/slices/tasksSlice';

const Footer = () => {
  const { value: tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(DELETE_COMPLETED_TASKS());
  };

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isDone).length}</p>
      <button className="footer-btn" onClick={handleClick}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;

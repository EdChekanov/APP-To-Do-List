import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
  const tasks = useSelector((store) => store.tasks.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'delete completed' });
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

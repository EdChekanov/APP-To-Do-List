import { useContext } from 'react';
import ToDoContext from '../Context';

const Filters = () => {
  const { filter, setFilter } = useContext(ToDoContext);

  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Все
        </button>
      </li>
      <li>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Активные
        </button>
      </li>
      <li>
        <button
          onClick={() => setFilter('done')}
          className={filter === 'done' ? 'active' : ''}
        >
          Завершённые
        </button>
      </li>
    </ul>
  );
};

export default Filters;

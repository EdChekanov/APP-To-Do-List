import { useContext } from 'react';
import ToDoContext from '../Context';

const FilterButton = ({ content, method }) => {
  const { filter, setFilter } = useContext(ToDoContext);

  return (
    <button
      onClick={() => setFilter(method)}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;

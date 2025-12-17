import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/slices/tasksSlice';

const FilterButton = ({ content, method }) => {
  const { filter } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setFilter(method))}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;

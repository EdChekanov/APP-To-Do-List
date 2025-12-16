import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER } from '../redux/slices/tasksSlice';

const FilterButton = ({ content, method }) => {
  const { filter } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(SET_FILTER(method))}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;

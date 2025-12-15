import { useDispatch, useSelector } from 'react-redux';

const FilterButton = ({ content, method }) => {
  const { filter } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch({ type: 'SET_FILTER', payload: method })}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;

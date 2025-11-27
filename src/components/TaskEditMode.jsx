import useClickOutside from '../hooks/useClickOutside ';

const TaskEditMode = ({
  editText,
  setEditText,
  handleClickEdit,
  task,
  setIsEdit,
  inputRef,
}) => {
  const onCancelClick = () => {
    setEditText(task.title);
    setIsEdit(false);
  };

  const ref = useClickOutside(() => onCancelClick());

  return (
    <div ref={ref}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClickEdit(task.id, editText, inputRef);
          if (e.key === 'Escape') {
            onCancelClick();
          }
        }}
      />
    </div>
  );
};

export default TaskEditMode;

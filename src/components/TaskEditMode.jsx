const TaskEditMode = ({
  editText,
  setEditText,
  handleClickEdit,
  taskId,
  inputRef,
  onCancelClick,
}) => {
  return (
    <input
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClickEdit(taskId, editText, inputRef);
        if (e.key === 'Escape') {
          onCancelClick();
        }
      }}
    />
  );
};

export default TaskEditMode;

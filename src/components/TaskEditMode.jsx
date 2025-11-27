const TaskEditMode = ({
  editText,
  setEditText,
  handleClickEdit,
  task,
  inputRef,
  onCancelClick,
}) => {
  return (
    <>
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
    </>
  );
};

export default TaskEditMode;

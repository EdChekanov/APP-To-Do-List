const initValue = {
  value: JSON.parse(
    localStorage.getItem('tasks') || [
      {
        id: 1,
        title: 'Выучить react',
        isDone: false,
      },
      {
        id: 2,
        title: 'Сдать 2-й чек-лист',
        isDone: false,
      },
    ]
  ),
  filter: 'all',
};

const tasksReducer = (store = initValue, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return {
        ...store,
        value: [
          ...store.value,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            isDone: false,
          },
        ],
      };
    case 'EDIT_TASK_TITLE':
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, title: action.payload.newTitle };
          }
          return task;
        }),
      };
    case 'SWITCH_COMPLETE_STATUS':
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, isDone: !task.isDone };
          }
          return task;
        }),
      };
    case 'DELETE_TASK':
      return {
        ...store,
        value: store.value.filter((task) => {
          return !(task.id == action.payload.id);
        }),
      };
    case 'DELETE_COMPLETED_TASKS':
      return { ...store, value: store.value.filter((task) => !task.isDone) };
    case 'SET_FILTER':
      return { ...store, filter: action.payload };
    default:
      return store;
  }
};

export default tasksReducer;

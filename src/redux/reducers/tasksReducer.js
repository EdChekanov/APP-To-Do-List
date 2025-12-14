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
};

const tasksReducer = (store = initValue, action) => {
  switch (action.type) {
    case 'add new task':
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
    case 'edit task title':
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, title: action.payload.newTitle };
          }
          return task;
        }),
      };
    case 'switch complete status':
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, isDone: !task.isDone };
          }
          return task;
        }),
      };
    case 'delete task':
      return {
        ...store,
        value: store.value.filter((task) => {
          return !(task.id == action.payload.id);
        }),
      };
    case 'delete completed':
      return { ...store, value: store.value.filter((task) => !task.isDone) };

    default:
      return store;
  }
};

export default tasksReducer;

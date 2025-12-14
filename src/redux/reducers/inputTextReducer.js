const initValue = {
  value: '',
};

const inputTextReducer = (store = initValue, action) => {
  switch (action.type) {
    case 'change':
      return { ...store, value: action.payload };
    case 'clear':
      return { ...store, value: '' };
    default:
      return store;
  }
};

export default inputTextReducer;

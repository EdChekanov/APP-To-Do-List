const initValue = {
  value: '',
};

const inputTextReducer = (store = initValue, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...store, value: action.payload };
    case 'CLEAR':
      return { ...store, value: '' };
    default:
      return store;
  }
};

export default inputTextReducer;

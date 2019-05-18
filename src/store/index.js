import  { createStore } from 'redux';
import reducer from './reducer' // 记录本

// 图书管理员
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
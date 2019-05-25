import  { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer' // 记录本
// import thunk from 'redux-thunk';

// redux-devtools-extension 高级配置 只需复制
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  // applyMiddleware(thunk)
);

// 图书管理员
const store = createStore( // 创建store
  reducer, // 使用reducer 构建初始数据
  // 使用 中间件 thunk ( redux 的 中间件 并非 react的中间件 )
  enhancer
);

export default store;
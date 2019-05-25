import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import TodoList from './TodoList';
import TodoList from './reactRedux';
import * as serviceWorker from './serviceWorker';
//  引入 react-redux
import { Provider } from 'react-redux'; // Provider 链接store 其中内部组件都获得可以使用store的能力
import store from './storeRedux'

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

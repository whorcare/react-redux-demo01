import React, { Component } from 'react';
import store from './store/index'
import 'antd/dist/antd.css';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getTodoList, initListAction } from './store/actionCreators'
import TodoListUI from './TodoListUI'
import axios from 'axios'

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取store数据
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    store.subscribe(this.handleStoreChange); // 订阅 store 实时接收最新数据
  }

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }

  componentDidMount() {
    // redux-thunk 使用
    console.log(getTodoList());
    // const action = getTodoList();
    // store.dispatch(action);

    // redux-saga 使用
    axios.get('./list.json').then((res) => {
      console.log(res);
    }).catch(() => {
      console.log('接口假数据2');
      const data = ['1', '2', '3'];
      const action = initListAction(data);
      store.dispatch(action);
    })
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action); // 传输 给 store
  }

  handleStoreChange() {
    this.setState(store.getState()); // 在感知改变后 进行state数据修改
  }

  handleBtnClick() {
    const action = getAddItemAction();
    store.dispatch(action);
  }

  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
}

export default TodoList;
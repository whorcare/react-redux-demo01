import React, { Component } from 'react';
import store from './store/index'
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取store数据
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange); // 订阅 store 实时接收最新数据
  }

  render() {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>TodoList</div>
        <Input
          value={this.state.inputValue}
          placeholder="Basic usage"
          style={{width: '300px', marginRight: '10px'}}
          onChange={this.handleInputChange}
        />
        <Button type="primary" onClick={this.handleBtnClick}>搜索</Button>
        <List
          size="small"
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => <List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>}
          style={{width: '300px'}}
        />
      </div>
    )
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
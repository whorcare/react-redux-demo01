import React from 'react';
import { Input, Button, List } from 'antd';

// 无状态组件 当只有render函数 时 可以 使用此方法替代
// 无状态组件 就是一个 函数 （性能高）
const TodoListUI = (props) => {
  return (
    <div style={{marginTop: '10px', marginLeft: '10px'}}>
      <div>TodoList</div>
      <Input
        value={props.inputValue}
        placeholder="Basic usage"
        style={{width: '300px', marginRight: '10px'}}
        onChange={props.handleInputChange}
      />
      <Button type="primary" onClick={props.handleBtnClick}>搜索</Button>
      <List
        size="small"
        bordered
        dataSource={props.list}
        renderItem={(item, index) => <List.Item onClick={(index) => { props.handleItemDelete(index)}}>{item}</List.Item>}
        style={{width: '300px'}}
      />
    </div>
  )
};

// UI 组件 只用来 显示 没有逻辑
//class TodoListUI extends Component {
//  render() {
//    return (
//      <div style={{marginTop: '10px', marginLeft: '10px'}}>
//        <div>TodoList</div>
//        <Input
//          value={this.props.inputValue}
//          placeholder="Basic usage"
//          style={{width: '300px', marginRight: '10px'}}
//          onChange={this.props.handleInputChange}
//        />
//        <Button type="primary" onClick={this.props.handleBtnClick}>搜索</Button>
//        <List
//          size="small"
//          bordered
//          dataSource={this.props.list}
//          renderItem={(item, index) => <List.Item onClick={(index) => { this.props.handleItemDelete(index) }}>{item}</List.Item>}
//          style={{width: '300px'}}
//        />
//      </div>
//    )
//  }
//}

export default TodoListUI;
import React, {Component} from 'react';
import { connect } from 'react-redux'; // react-redux 通过connect API 获取 store 数据

class TodoList extends Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.props.inputValue} onChange={this.props.changeInputValue}/>
          <button onClick={this.props.handleBtnClick}>提交</button>
        </div>
        <ul>
          {
            this.props.list.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

// 链接规则 将state 的 数据 映射 为 props
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
};

// 改变 store 数据
// store .dispatch. props
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      };
      dispatch(action);
    },

    handleBtnClick() {
      const action = {
        type: 'add_todo_item',
      };
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
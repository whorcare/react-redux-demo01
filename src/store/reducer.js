import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'

// 笔记
const defaultState = {
  inputValue: '',
  list: [],
};

// reducer 可以接收 state，但是绝不能修改state
// 纯函数指的是 给定固定的输入 就一定会有固定的输出， 而且不会有副作用 (不能有ajax操作)
export default (state = defaultState, action) => { // state => 上一次存储的数据  action => 用户传过来的信息
  console.log(action);
  // 固定套路
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  // 按钮添加
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }

  // 删除
  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }

  // 接口数据获取
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data;
    return newState;
  }

  // 默认返回 state
  return state;
}
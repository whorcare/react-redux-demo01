/* 统一管理action */
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value,
});

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM,
});

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index,
});

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data,
});

// 使用中间件 在操作redux 时 可以使用 函数
export const getTodoList = () => {
  // 此时 thunk 可以 返回函数
  return (dispatch) => {
    axios.get('./list.json').then((res) => {
      console.log(res);
    }).catch(() => {
      console.log('接口假数据');
      const data = ['1', '2', '3'];
      const action = initListAction(data);
      dispatch(action);
    })
  }
};
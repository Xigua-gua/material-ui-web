/**
 * @desc 请求部分的Reducer
 * @author Jafeney <jafeney@yijunet.cc>
 * @date 2017-03-30
 **/

import * as TYPES from '../types'

export function request(state = {}, action) {
  switch (action.type) {
    // 自动发出的请求
    case TYPES.REQUEST_AUTO:
      return {
        ...state,
        error: null,
        code: null,
        status: 'background',
      }
    // 请求等待中
    case TYPES.REQUEST_PENDDING:
      return {
        ...state,
        error: null,
        code: null,
        status: 'pendding',
      }
    // 请求失败
    case TYPES.REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
        code: action.code,
      }
    // 请求成功
    case TYPES.REQUEST_SUCCESS:
      return {
        ...state,
        error: null,
        code: null,
        status: 'success',
      }
    // 请求清除
    case TYPES.REQUEST_CLEAN:
      return {
        state: {},
        error: null,
        code: null,
      }
    default:
      return state
  }
}



import * as TYPES from '../types'

const initialState = {
  preload: false,
  // items: []
}

// 用户列表reducer
export function user(state = initialState, action) {
  switch (action.type) {
    case TYPES.USER_INFO:
      return {
        preload: true,
        status: 'logged',
        info: action.result,
      }
    case TYPES.USER_LOGOUT:
      return {
        preload: false,
        status: 'loggout',
        info: {},
      }
    default:
      return state
  }
}

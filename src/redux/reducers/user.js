
import * as TYPES from '../types'

const initialState = {
  preload: false,
  // items: []
}

// 用户列表reducer
export function userList(state = initialState, action) {
  switch (action.type) {
    case TYPES.USERS_LIST:
      return {
        ...state,
        userlist: action.result
      }
    default:
      return state
  }
}

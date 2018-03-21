
import * as TYPES from '../types'
import { HEADERS } from '../../config'
import { request } from './request'

// 获取用户列表
export function getUsersList(opt = {}) {
  return (dispatch) => {
    const route = '/users'
    const method = 'GET'
    // const params = {
    //   page_no: 1,
    //   page_size: 10,
    //   ...opt.params,
    // }
    const headers = {
      ...HEADERS,
      Authorization: opt.token,
    }
    const success = (data) => {
      dispatch({ type: TYPES.USERS_LIST, result: data })
      opt.success && opt.success(data)
    }
    request(route,{},dispatch, success, { method, headers })
  }
}

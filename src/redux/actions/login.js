/**
 * [loginByPhone 手机+密码登录]
 * @param  {[type]} opt [username, password, success]
 */
 import base64 from 'base-64'
 import * as TYPES from '../types'
 import { HEADERS, USER_KEY } from '../../config'
 import { request } from './request'

const { localStorage } = global

export function check(opt) {
  return (dispatch) => {
    const data = localStorage.getItem(USER_KEY)
    const info = data ? JSON.parse(data) : {}
    if (info){
      return info
    }else {
      localStorage.removeItem(USER_KEY)
      dispatch({ type: TYPES.USER_LOGOUT })
    }
  }
}
export function loginByPhone(opt) {
  return (dispatch) => {
    const route = 'token'
    const method = 'GET'
    const headers = {
      ...HEADERS,
      Authorization: `Basic ${base64.encode(`${opt.phone_number}:${opt.password}`)}`,
    }
    const success = (data) => {
      // console.log('登录请求成功返回的数据: ',data);
      localStorage.setItem(USER_KEY, JSON.stringify(data))
      dispatch({ type: TYPES.USER_INFO, result: data })
      opt.success && opt.success(data)
    }
    request(route, {}, dispatch, success, { method, headers })
  }
}

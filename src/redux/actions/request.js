/**
 * @desc 网络请求的actions


 **/
import { pendingTask, begin, end } from 'react-redux-spinner'
// import { message } from 'antd'
import fetch from 'isomorphic-fetch'
import { API_URI } from '../../config'
import * as TYPES from '../types'


export function request(route, params, dispatch, success = null, { method = 'GET', headers = {}, body = null } = {}, isAuto = false) {
  // 是否为程序自动发出的请求
  if (isAuto) {
    // console.log('auto request')
    dispatch({ type: TYPES.REQUEST_AUTO, [pendingTask]: begin })
  } else {
    // console.log('normal request')
    dispatch({ type: TYPES.REQUEST_PENDDING, [pendingTask]: begin })
  }
  // 处理query
  const p = params ?
    `?${Object.entries(params).map(i => `${i[0]}=${encodeURI(i[1])}`).join('&')}`
    : ''
  const uri = `${API_URI}${route}${p}`
  const data = { method, headers }
  if (method !== 'GET') data.body = body
  // console.log(`[${method}]:${uri}`)
  const promise = Promise.race([
    fetch(uri, data)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
        return { code: response.status }
      })
      .catch((err) => {
        // dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
        console.warn(err)
      })
    ,
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('timeout')), 30000)
    })
  ])
  promise.then((res) => {

    if (res.code == 0) {
      // console.log(res);
      dispatch({ type: TYPES.REQUEST_SUCCESS, [pendingTask]: end })
      if (success) {
        success(res.result)
      }
    } else if (res.code === 401) {
      if (route === 'token') {
        console.log('抱歉,请输入正确的用户名或密码!')
      } else {
        console.log('登录超时，请重新登录')
      }
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
      // dispatch({ type: TYPES.USER_LOGOUT })
    } else if (res.code === 403) {
      console.log('抱歉，您没有这个权限')
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
    } else if (res.code === 404) {
      console.log('无效的请求')
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
    } else if (res.code === 500) {
      console.log('服务器出错了，请稍后重试！')
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
    }else if (res.code === 504) {
      console.log('请检查网络')
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
    } else {
      console.log(`抱歉，请求失败`)
      dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
    }
  })
  promise.catch(err => {
    console.log("请求超时")
    dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
  });
}

export function requestClean() {
  return { type: TYPES.REQUEST_CLEAN }
}

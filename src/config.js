/* @desc 项目基本配置
**/

export const API_URI = '/api/'
export const USER_KEY = '@PAERTPET:USER'

export const HEADERS = {
 Accept: 'application/json',
 'Content-Type': 'application/json; charset=UTF-8',
 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
 Host: API_URI,
 Referer: `http://${API_URI}/`,
}

export const PATTERN = {
 phone: /^((((13[0-9])|(15[^4,\D])|(18[0-9])|(17[6-8])|(14[57]))\d{8})|((170[05789])\d{7}))$/,
}

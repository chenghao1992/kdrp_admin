import { request } from '../utils'
// 获取手机验证码
export async function getMsgCode (params) {
  return request(`/api/mobile_captcha/${params.status}/`, {
    method: 'post',
    data: params,
  })
}
// 验证手机验证码
export async function checkPhoneCode (params) {
  return request(`/api/validate_mobile_captcha_standalone/${params.source}/`, {
    method: 'post',
    data: params,
  })
}

// 重置密码
export async function saveResetPwd (params) {
  return request('/api/reset_password/', {
    method: 'post',
    data: params,
  })
}

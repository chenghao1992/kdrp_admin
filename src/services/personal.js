/**
 * Created by chenghao01 on 2017/3/29.
 */
import { request } from '../utils'
// 更换个人状态
export async function changePersonalStatus (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_status/`, {
    method: 'post',
    data: { status: params.status },
  })
}
// 拿到初始化数据
export async function initData (params) {
  let url = params.userId ? `/api/drp/employee/${params.userId}/detail/` : '/api/drp/employee/detail/'
  return request(url, {
    method: 'get',
    data: params,
  })
}
// 保存个人信息
export async function savePersonalIfo (params) {
  return request(`/api/drp/employees/${params.userId}/personal_info/`, {
    method: 'post',
    data: params,

  })
}
// 获取短信验证码  获取验证码是引入重置密码的接口  没用这里的
// 更换手机号
export async function changePhone (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_mobile/`, {
    method: 'post',
    data: params,
  })
}
// 更换邮箱
export async function changeEmail (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_email/`, {
    method: 'post',
    data: params,

  })
}
// 绑定账号
export async function bindAccount (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_kaisa_account/`, {
    method: 'post',
    data: params,

  })
}
// 修改地址信息
export async function subChangeArea (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_address/`, {
    method: 'post',
    data: params,

  })
}
// 修改密码
export async function changePwd (params) {
  return request('/api/change_password/', {
    method: 'post',
    data: params,

  })
}

// 修改头像
export async function imgUploads (params) {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_avatar/`, {
    method: 'post',
    data: params,
  })
}

// 查询账号绑定金服
export async function getBindingText () {
  return request(`/api/drp/employees/${localStorage.getItem('userId')}/personal_kaisa_account/`, {
    method: 'POST',
  })
}
// 更新账号绑定金服
export async function refreshAccount () {
  return request('/api/drp/refresh_employee_account_status/', {
    method: 'GET',
  })
}
// 更新开户状态
export async function refreshOpenAccount () {
  return request('/api/drp/refresh_employee_open_status/', {
    method: 'GET',
  })
}


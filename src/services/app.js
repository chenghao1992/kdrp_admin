import { request } from '../utils'

export async function login (params) {
  return request('/api/login/', {
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request('/api/logout/', {
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params,
  })
}

export async function queryUserInfo (params, routesCallback) {
  return request('/api/user_info/', {
    method: 'get',
    data: params,
  }, routesCallback)
}


export async function switchRole (params) {
  return request('/api/role/switch/', {
    method: 'post',
    data: params,
  })
}

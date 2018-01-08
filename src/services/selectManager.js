import { request } from '../utils'

// 组织架构查询管理员
export async function query (params) {
  return request('/api/drp/employee/selector/', {
    method: 'get',
    data: params,
  })
}


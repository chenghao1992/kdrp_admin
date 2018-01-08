import { request } from '../utils'

// 查询业务员
export async function query (params) {
  return request('/api/drp/employee/query/', {
    method: 'get',
    data: params,
  })
}


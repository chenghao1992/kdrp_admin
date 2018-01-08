import { request } from '../utils'

export async function queryList (params) {
  return request('/api/drp/performance_report/', {
    method: 'get',
    data: params,
  })
}

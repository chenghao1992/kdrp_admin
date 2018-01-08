import { request } from '../utils'

export async function queryList (params) {
  return request('/api/drp/employee_fee_details/', {
    method: 'get',
    data: params,
  })
}

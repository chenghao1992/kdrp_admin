import { request } from '../utils'

export async function queryNumbers (params) {
  return request('/api/drp/employee_fee_bills/personal_summary/', {
    method: 'get',
    data: params,
  })
}
export async function queryList (params) {
  return request('/api/drp/employee_fee_bills/personal/', {
    method: 'get',
    data: params,
  })
}

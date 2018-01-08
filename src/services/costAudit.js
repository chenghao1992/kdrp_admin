import { request } from '../utils'

export async function queryListAudit (params) {
  return request('/api/drp/employee_fee_bills/finance/', {
    method: 'get',
    data: params,
  })
}

export async function batchPass (params) {
  return request('/api/drp/employee_fee_bills/edit/', {
    method: 'post',
    data: params,
  })
}


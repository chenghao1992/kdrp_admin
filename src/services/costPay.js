import { request } from '../utils'

export async function queryListPay (params) {
  return request('/api/drp/employee_fee_bills/cashier/', {
    method: 'get',
    data: params,
  })
}

export async function batchPay (params) {
  return request('/api/drp/employee_fee_bills/edit/', {
    method: 'post',
    data: params,
  })
}

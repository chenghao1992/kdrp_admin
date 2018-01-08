import { request } from '../utils'

export async function queryListSub (params) {
  return request('/api/drp/employee_report/', {
    method: 'get',
    data: params,
  })
}


export async function exportCustomerService (params) {
  return request('/api/drp/employee_report_export/', {
    method: 'get',
    data: params,
  })
}


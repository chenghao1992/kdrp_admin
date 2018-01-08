import { request } from '../utils'

export async function queryList (params) {
  return request('/api/drp/finance_report/', {
    method: 'get',
    data: params,
  })
}

export async function exportFinance (params) {
  return request('/api//drp/finance_report_export/', {
    method: 'get',
    data: params,
  })
}

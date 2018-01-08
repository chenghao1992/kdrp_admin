import { request } from '../utils'

export async function queryListMain (params) {
  return request('/api/drp/agency_report/', {
    method: 'get',
    data: params,
  })
}


export async function exportMechanism (params) {
  return request('/api/drp/agency_report_export/', {
    method: 'get',
    data: params,
  })
}


import { request } from '../utils'

export async function query (params) {
  return request('/api/drp/dashboard/', {
    method: 'get',
    data: params,
  })
}

export async function queryIncomeBar ({ url = '/api/drp/agency_fee_column/', ...params }) {
  return request(url, {
    method: 'get',
    data: params,
  })
}

export async function detailperson () {
  return request('/api/drp/employee/detail/', {
    method: 'GET',
  })
}


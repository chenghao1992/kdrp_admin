import { request } from '../utils'

export async function query (params) {
  return request('/api/drp/agency/rights/', {
    method: 'get',
    data: params,
  })
}

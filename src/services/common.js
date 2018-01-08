import { request } from '../utils'

export async function queryOrgTree (params) {
  return request('/api/drp/agency/tree/', {
    method: 'get',
    data: params,
  })
}

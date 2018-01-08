import { request } from '../utils'

export async function query (params) {
  if (params && params.id !== undefined) {
    return request(`/api/drp/channel/${params.id}/tree/`, {
      method: 'get',
    })
  }
  return request('/api/drp/agency/structure/', {
    method: 'get',
  })
}

export async function create (params) {
  return request('/api/drp/agency/new/', {
    method: 'post',
    data: params,
  })
}

export async function queryOrgnizition (params) {
  return request(`/api/drp/agency/${params.id}/`, {
    method: 'get',
  })
}

export async function update (params) {
  return request(`/api/drp/agency/${params.id}/edit/`, {
    method: 'post',
    data: params,
  })
}

/* export async function remove (params) {
 return request('/api/users', {
 method: 'delete',
 data: params
 })
 }

 */

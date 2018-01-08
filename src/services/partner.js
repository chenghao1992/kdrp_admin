import { request } from '../utils'

export async function create (params) {
  return request('/api/drp/channel/new/', {
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request('/api/drp/channel/', {
    method: 'get',
    data: params,
  })
}

export async function queryLeaders (params) {
  return request('/api/drp/channel/leaders/', {
    method: 'get',
    data: params,
  })
}

export async function distributeBm (params) {
  return request(`/api/drp/channel/${params.currentChannelId}/leader/`, {
    method: 'post',
    data: params,
  })
}

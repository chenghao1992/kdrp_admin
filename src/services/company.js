import { request } from '../utils'


export async function updateBasic (params) {
  return request(`/api/drp/agency/${params.id}/base_info/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function updateContact (params) {
  return request(`/api/drp/agency/${params.id}/contact/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function updateFinance (params) {
  return request(`/api/drp/agency/${params.id}/finance/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function updateAddress (params) {
  return request(`/api/drp/agency/${params.id}/address/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function updateAvatar (params) {
  return request(`/api/drp/agency/${params.id}/avatar/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function changeCompanyState (params) {
  return request(`/api/drp/agency/${params.id}/${params.action}/`, {
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  // id为组织id；
  if (params && params.id !== undefined) {
    return request(`/api/drp/agency/${params.id}/detail/`, {
      method: 'get',
    })
  }
  return request('/api/drp/agency/detail/', {
    method: 'get',
  })
}

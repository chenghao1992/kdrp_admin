import { request } from '../utils'

export async function agreeText (params) {
  return request(`/api/drp/employees/${params.id}/personal_agreement/`, {
    method: 'POST',
  })
}

export async function detailes () {
  return request('/api/drp/employee/detail/', {
    method: 'GET',
  })
}

/**
 * Created by xiaoys on 2017/4/5.
 */
import { request } from '../utils'

export async function queryListAudit (params) {
  return request('/api/drp/employee/list/', {
    method: 'GET',
    data: params,
  })
}

export async function create (params) {
  return request('/api/drp/employee/new/', {
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request(`/api/drp/employee/${params.id}/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function sendItem (params) {
  return request(`/api/drp/employee/${params}/send_invite_msg/`, {
    method: 'post',
    data: params,
  })
}


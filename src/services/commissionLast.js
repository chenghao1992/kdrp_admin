import { request } from '../utils'

export async function queryListLast (params) {
  return request('/api/drp/person_report/', {
    method: 'get',
    data: params,
  })
}

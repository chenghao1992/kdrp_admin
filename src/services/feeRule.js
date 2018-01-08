/**
 * Created by pengshuo on 17/3/31.
 */
import { request } from '../utils'

export async function addRule (params) {
  return request('/api/drp/fee_rule/new/', {
    method: 'post',
    data: params,
  })
}

export async function editRule (params) {
  return request(`/api/drp/fee_rule/${params.ruleId}/edit/`, {
    method: 'post',
    data: params,
  })
}

export async function deleteRule (params) {
  return request(`/api/drp/fee_rule/${params.ruleId}/delete/`, {
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request('/api/drp/fee_rules/', {
    method: 'get',
    data: params,
  })
}

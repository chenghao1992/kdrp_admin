/**
 * Created by xiaoys on 2017/11/8.
 */
import { request } from '../utils'

export async function customerBdList (params) {
  return request('/api/drp/pre_customers/', {
    method: 'get',
    data: params,
  })
}

export async function assort (params) {
  return request('/api/drp/pre_customer/assort/', {
    method: 'post',
    data: params,
  })
}

export async function employee (params) {
  return request('/api/drp/employee/query/', {
    method: 'get',
    data: params,
  })
}

import { request } from '../utils'

export async function query (params) {
  return request('/api/drp/customer/list/', {
    method: 'get',
    data: params,
  })
}

export async function queryCs (params) {
  return request('/api/drp/service_customer/list/', {
    method: 'get',
    data: params,
  })
}

// 分配
export async function assort (params) {
  return request('/api/drp/customer/assort/', {
    method: 'post',
    data: params,
  })
}

// 回收
export async function retrieve (params) {
  return request('/api/drp/customer/retrieve/', {
    method: 'post',
    data: params,
  })
}

// 上交
export async function commit (params) {
  return request('/api/drp/customer/commit/', {
    method: 'post',
    data: params,
  })
}

// 按员工分配
export async function redistribute (params) {
  return request('/api/drp/employee/tranfer_customer/', {
    method: 'post',
    data: params,
  })
}

// 导入客户数据
export async function importCustomer (params) {
  return request('/api/drp/customer/import/', {
    method: 'post',
    data: params,
  })
}


export async function queryOrgTreeCust (params) {
  return request('/api/agency/tree/', {
    method: 'get',
    data: params,
  })
}

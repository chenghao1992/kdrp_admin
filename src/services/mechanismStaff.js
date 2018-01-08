import { request } from '../utils'

/* 职工维护*/

// 查询职工维护列表
export async function mechanismStaffList (params) {
  return request('/api/drp/staffs/', {
    method: 'GET',
    data: params,
  })
}

// 职工导入
export async function mechanismStaffImport (params) {
  return request('/api/drp/staff/import/', {
    method: 'POST',
    data: params,
  })
}

// 查询职工
export async function searchMechanismStaff (params) {
  return request('/api/drp/staff/query/', {
    method: 'GET',
    data: params,
  })
}

// 添加职工
export async function addMechanismStaff (params) {
  return request('/api/drp/staff/add/', {
    method: 'POST',
    data: params,
  })
}

// 职工修改
export async function modifyMechanismStaff (params) {
  return request(`/api/drp/staff/${params.id}/edit/`, {
    method: 'POST',
    data: params.data,
  })
}

// 删除职工
export async function deleteMechanismStaff (params) {
  return request(`/api/drp/staff/${params.id}/delete/`, {
    method: 'POST',
  })
}

/* 职工投资*/

// 查询职工投资统计报表
export async function staffInvestLists (params) {
  return request('/api/drp/staff/invest_report/', {
    method: 'get',
    data: params,
  })
}

// 投资列表导出
export async function staffExport (params) {
  return request('/api/drp/staff/invest_report/export/', {
    method: 'POST',
    data: params,
  })
}

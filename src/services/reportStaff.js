/**
 * Created by xiaoys on 2017/12/13.
 */
import { request } from '../utils'

// 二级组织树
export async function treeLimit2 (params) {
  return request('/api/drp/agency/tree/limit2/', {
    method: 'get',
    data: params,
  })
}

// 职工投资统计报表-按组织
export async function investReportAgency (params) {
  return request('/api/drp/staff/invest_report_by_agency/', {
    method: 'get',
    data: params,
  })
}


// 职工投资统计报表-按组织 导出
export async function agencyExport (params) {
  return request('/api/drp/staff/invest_report_by_agency/export/', {
    method: 'post',
    data: params,
  })
}


// 职工投资统计报表-按个人
export async function investReportPerson (params) {
  return request('/api/drp/staff/invest_report_by_person/', {
    method: 'get',
    data: params,
  })
}

// 职工投资统计报表-按个人 导出
export async function personExport (params) {
  return request('/api/drp/staff/invest_report_by_person/export/', {
    method: 'post',
    data: params,
  })
}


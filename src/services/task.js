import { request } from '../utils'

// 任务列表
export async function query (params) {
  return request('/api/tasks/', {
    method: 'get',
    data: params,
  })
}

// 任务详情-info
export async function queryDetail (params) {
  return request(`/api/task/${params.id}/`, {
    method: 'get',
    data: params,
  })
}

// 任务详情-result list
export async function queryList (params) {
  return request(`/api/task/${params.id}/records/`, {
    method: 'get',
    data: params,
  })
}

// 当前任务
export async function currentTask (params) {
  return request('/api/current_task/', {
    method: 'get',
    data: params,
  })
}


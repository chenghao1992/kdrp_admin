/**
 * Created by xiaoys on 2017/12/13.
 */
import { request } from '../utils'


// 客户基本信息接口
export async function customerCode (params) {
  return request('/api/drp/customer/detail/', {
    method: 'get',
    data: params,
  })
}

// 客户联系人列表
export async function contactList (params) {
  return request('/api/drp/customer/contact/list/', {
    method: 'get',
    data: params,
  })
}

// 客户主要联系人开关
export async function contactButton (params) {
  return request('/api/drp/customer/contact/button/', {
    method: 'post',
    data: params,
  })
}

// 新建联系人
export async function contactNew (params) {
  return request('/api/drp/customer/contact/new/', {
    method: 'post',
    data: params,
  })
}

// 编辑联系人
export async function contactEdit (params) {
  return request('/api/drp/customer/contact/edit/', {
    method: 'post',
    data: params,
  })
}

// 查看联系人
export async function contactDetail (params) {
  return request('/api/drp/customer/contact/detail/', {
    method: 'get',
    data: params,
  })
}

// 客户房产列表
export async function houseList (params) {
  return request('/api/drp/customer/house/list/', {
    method: 'get',
    data: params,
  })
}

// 新建房产
export async function houseNew (params) {
  return request('/api/drp/customer/house/new/', {
    method: 'post',
    data: params,
  })
}

// 编辑房产
export async function houseEdit (params) {
  return request('/api/drp/customer/house/edit/', {
    method: 'post',
    data: params,
  })
}

// 客户车辆列表
export async function carList (params) {
  return request('/api/drp/customer/car/list/', {
    method: 'get',
    data: params,
  })
}

// 新建车辆
export async function carNew (params) {
  return request('/api/drp/customer/car/new/', {
    method: 'post',
    data: params,
  })
}

// 编辑车辆
export async function carEdit (params) {
  return request('/api/drp/customer/car/edit/', {
    method: 'get',
    data: params,
  })
}

// 备注列表
export async function remarkList (params) {
  return request('/api/drp/customer/remark/list/', {
    method: 'get',
    data: params,
  })
}

// 新建备注
export async function remarkNew (params) {
  return request('/api/drp/customer/remark/new/', {
    method: 'post',
    data: params,
  })
}

// 查询备注类型
export async function remarkTypes (params) {
  return request('/api/drp/customer/remark/types/', {
    method: 'get',
    data: params,
  })
}

// 查询联系人关系类型
export async function contactTypes (params) {
  return request('/api/drp/customer/contact/types/', {
    method: 'get',
    data: params,
  })
}

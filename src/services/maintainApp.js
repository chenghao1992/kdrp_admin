/**
 * Created by xiaoys on 2017/9/11.
 */
import { request } from '../utils'


// 栏目列表
export async function columnList (params) {
  return request('/api/catalogs/', {
    method: 'get',
    data: params,
  })
}
// 新增栏目
export async function addColumn (params) {
  return request('/api/catalogs/', {
    method: 'post',
    data: params,
  })
}
// 删除栏目
export async function deleteColumn (params) {
  return request(`/api/catalogs/${params}/delete/`, {
    method: 'post',
    data: params,
  })
}

// 编辑栏目
export async function editColumn (params) {
  return request(`/api/catalogs/${params.id}/`, {
    method: 'post',
    data: params,
  })
}

// 新增文章
export async function addEditor (params) {
  return request('/api/articles/', {
    method: 'post',
    data: params,
  })
}

// 文章列表
export async function articlesList (params) {
  return request('/api/articles/', {
    method: 'get',
    data: params,
  })
}

// 文章详情
export async function articlesDetail (params) {
  return request(`/api/articles/${params}/`, {
    method: 'get',
    data: params,
  })
}

// 修改文章
export async function editArticles (params) {
  return request(`/api/articles/${params.id}/`, {
    method: 'post',
    data: params,
  })
}

// 删除文章
export async function deleteArticles (params) {
  return request(`/api/articles/${params}/delete/`, {
    method: 'post',
  })
}

// 修改常见问题
export async function saveProblems (params) {
  return request('/api/special_custom/', {
    method: 'post',
    data: params,
  })
}

// 常见问题详情
export async function problemDetail (params) {
  return request('/api/special_custom/', {
    method: 'get',
    data: params,
  })
}

// 新增广告图
export async function addMap (params) {
  return request('/api/banners/', {
    method: 'post',
    data: params,
  })
}

// 编辑广告图
export async function editMap (params) {
  return request(`/api/banners/${params.id}/`, {
    method: 'post',
    data: params,
  })
}

// 广告图列表
export async function mapList (params) {
  return request('/api/banners/', {
    method: 'get',
    data: params,
  })
}

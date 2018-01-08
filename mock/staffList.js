import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('staffList', Mock.mock({
  orgnid:1000,
  loading: false,
  'data|50': [
    {
      'id|+1': 1,
      'agency_code':["1","1001","1001001"],
      'name' : '王麻子',
      'mobile' : '15689895656',
      'role_name' : '兼职客服',
      'agency_name' : '佳兆业物业管理',
      'status' : '未激活',
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let usersListData = global[dataKey];

module.exports = {
  'POST off/api/drp/employee/list/' (req, res) {
    const page = qs.parse(req.body)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = usersListData.data.concat()
    let numbers=usersListData.numbers;

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = usersListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      usersListData.page.current = currentPage * 1
      newPage = usersListData.page
    }

    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)},orgnid:usersListData.orgnid})
    /*res.json(global[dataKey])*/
  },
  'POST off/api/drp/employee/new/' (req, res) {
    const newData = req.body



    usersListData.page.total = usersListData.data.length
    usersListData.page.current = 1

    global[dataKey] = usersListData

    res.json({success: true, data: usersListData.data, page: usersListData.page})
  },
  'POST off/api/drp/employee/edit/' (req, res) {
    const editItem = req.body

    usersListData.data = usersListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({success: true, data: usersListData.data, page: usersListData.page})
  },
  'POST /api/sms/send/' (req, res) {
    res.json({
      success: "success",
      message: '发送成功'
    })
  }
}

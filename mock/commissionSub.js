import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('commissionListSub', Mock.mock(
  {
    "data": [
      {
        "id": "1831abee-2306-11e7-ada0-a45e60ba345d",
        "mobile": "18555550002",
        "name": "业务员2",
        "range": {
          "invest_amount": "-",
          "invest_annual_amount": "-",
          "invest_cnt": "-",
          "invest_user_cnt": "-"
        },
        "yesterday": {
          "active_customer_cnt": "-",
          "available": "-",
          "customer_cnt": "-",
          "valid_customer_cnt": "-"
        }
      },
      {
        "id": "1830189c-2306-11e7-ab39-a45e60ba345d",
        "mobile": "18555550001",
        "name": "业务员1",
        "range": {
          "invest_amount": 0,
          "invest_annual_amount": 0,
          "invest_cnt": 0,
          "invest_user_cnt": 0
        },
        "yesterday": {
          "active_customer_cnt": 0,
          "available": 0,
          "customer_cnt": 2,
          "valid_customer_cnt": 0
        }
      }
    ],
    "message": "成功",
    "page": {
      "current": 1,
      "total": 2
    },
    "status": "success"
  }
))

let usersListData = global[dataKey]

module.exports = {
  'GET /off/api/drp/employee_report/' (req, res) {
    res.json(global[dataKey])
    /*const page = qs.parse(req.body)
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
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)},orgnid:usersListData.orgnid})*/

  },
  'POST /api/report/exportReportSub/' (req,res){
    res.json({
      status: "success",
      message: '导出成功'
    })
  }
}

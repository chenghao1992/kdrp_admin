import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('commissionListMain', Mock.mock(
  {
    "data": [
      {
        "code": "101",
        "id": "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
        "is_bottom": false,
        "name": "佳兆业物业集团",
        "range": {
          "invest_amount": 0,
          "invest_annual_amount": 0,
          "invest_cnt": 0,
          "invest_user_cnt": 0
        },
        "yesterday": {
          "active_customer_cnt": 0,
          "available": 0,
          "bottom_cnt": 0,
          "child_deep": 0,
          "customer_cnt": 2,
          "employee_cnt": 0,
          "valid_customer_cnt": 0
        }
      }
    ],
    "message": "成功",
    "page": {
      "current": 1,
      "total": 1
    },
    "status": "success"
  }
))

let usersListData = global[dataKey]

module.exports = {
  'GET /off/api/drp/agency_report/' (req, res) {
    res.json(global[dataKey])
  },
  'POST /api/report/exportReportMain/' (req,res){
    res.json({
      status: "success",
      message: '导出成功'
    })
  }
}

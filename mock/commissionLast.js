import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('commissionListLast', Mock.mock(
  {
    "data": {
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
    },
    "message": "成功",
    "status": "success"
  }
))

let usersListData = global[dataKey]

module.exports = {
  'GET /off/api/drp/person_report/' (req, res) {
    res.json(global[dataKey])
  }
}

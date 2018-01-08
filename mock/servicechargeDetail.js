import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('ServicechargeDetail', Mock.mock(
  {
    "data": [
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0b9e-2346-11e7-94ff-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_refused"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0b9f-2346-11e7-8d82-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "checking"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0ba0-2346-11e7-87c6-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0ba1-2346-11e7-ac9b-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0ba2-2346-11e7-9e9e-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0ba3-2346-11e7-912b-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f0ba4-2346-11e7-b8dd-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f32ae-2346-11e7-a7c8-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_refused"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f32af-2346-11e7-9a53-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      },
      {
        "bill_uuid": "3ebbb570-1e9c-11e7-828a-002324d1ae0f",
        "create_time": "2017-04-17 16:17:04",
        "fee_amount": 80.02,
        "id": "3d6f32b0-2346-11e7-90ca-002324d1ae0f",
        "invest_time": "2017-04-17 16:17:04",
        "loan_time": "2017-04-17 16:17:04",
        "loan_title": "相关标的",
        "mobile": "11222222252",
        "pay_time": "2017-04-17 16:17:04",
        "rate": 0.6,
        "status": "check_agreed"
      }
    ],
    "message": "成功",
    "page": {
      "current": 1,
      "total": 10
    },
    "status": "success"
  }
))

let usersListData = global[dataKey]

module.exports = {
  'GET /off/api/drp/employee_fee_details/' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = usersListData.data
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
    res.json({status: "success", data, page: {...newPage, pageSize: Number(pageSize)}})
    /*res.json(global[dataKey])*/
  }
}

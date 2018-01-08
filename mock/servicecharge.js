import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKeyNumbers = mockStorge('ServicechargeNumbers', Mock.mock(
  {
    "data": {
      "accounting_amount": 22,
      "accrued_amount": 50,
      "actally_amount": 80
    },
    "message": "成功",
    "status": "success"
  }
))

let dataKey = mockStorge('Servicecharge', Mock.mock(
  {
    "data": [
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a1-2416-11e7-aaf7-002324d1ae0f",
        "status": "checking"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a2-2416-11e7-8b38-002324d1ae0f",
        "status": "check_refused"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a3-2416-11e7-ace1-002324d1ae0f",
        "status": "checking"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a4-2416-11e7-b310-002324d1ae0f",
        "status": "checking"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a5-2416-11e7-b7ef-002324d1ae0f",
        "status": "check_refused"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a6-2416-11e7-982b-002324d1ae0f",
        "status": "check_agreed"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e7f4a7-2416-11e7-bee8-002324d1ae0f",
        "status": "checking"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e81bb0-2416-11e7-b141-002324d1ae0f",
        "status": "check_agreed"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e81bb1-2416-11e7-861c-002324d1ae0f",
        "status": "checking"
      },
      {
        "accounting_amount": null,
        "accrued_amount": null,
        "actally_amount": null,
        "bill_month": "2017-03",
        "id": "28e81bb2-2416-11e7-99e5-002324d1ae0f",
        "status": "check_refused"
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
  'GET /off/api/drp/employee_fee_bills/personal_summary/' (req,res){
    res.json(global[dataKeyNumbers])
  },
  'GET /off/api/drp/employee_fee_bills/personal/' (req, res) {
    const page = qs.parse(req.query)
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
    res.json({status: 'success', data, page: {...newPage, pageSize: Number(pageSize)}})
    /*res.json(global[dataKey])*/
  }
}

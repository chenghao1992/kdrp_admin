import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('costPay', Mock.mock(
  {
    status: 'success',
    message: '',
    data: [
      {
        "id":"0",
        "accounting_amount": 4654,//当月核算金额/当月应发金额
        "accrued_amount": 46546,//当月计提金额
        "actally_amount": 16541,//当月实发金额
        "agency_name": "佳兆业",//机构名称
        "bill_month": "2017-03",//费用归属月份
        "check_person_name": "财务01",//最后操作人
        "mobile": "1385464641",//兼职客服手机号
        "status": "check_agreed",//状态
        "update_time": "2017-04-11 17:50:07",//最后操作时间
        "username": "张三"//兼职客服
      },
      {
        "id":"1",
        "accounting_amount": 4654,//当月核算金额/当月应发金额
        "accrued_amount": 46546,//当月计提金额
        "actally_amount": 16541,//当月实发金额
        "agency_name": "佳兆业",//机构名称
        "bill_month": "2017-03",//费用归属月份
        "check_person_name": "财务01",//最后操作人
        "mobile": "1385464641",//兼职客服手机号
        "status": "pay_refused",//状态
        "update_time": "2017-04-11 17:50:07",//最后操作时间
        "username": "张三"//兼职客服
      },
    ],
    page: {
      total: 2,
      current: 1
    }
  }
))

let usersListData = global[dataKey]

module.exports = {
  'POST /off/api/drp/employee_fee_bills/edit/' (req,res){
    res.json({
      "data": "发放成功",
      "message": "成功",
      "status": "success"
    })
  },
  'GET /off/api/drp/employee_fee_bills/cashier/' (req, res) {
    res.json(global[dataKey])
    /*console.log('req',req)
    const page = qs.parse(req.body)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = usersListData.data

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
    res.json({status: "success",data, page: {...newPage, pageSize: Number(pageSize)}})*/

  }
}

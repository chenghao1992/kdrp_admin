const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {

  'GET /off/api/dpr/customer/list/' (req, res) {
    console.info(req);

    const query = qs.parse(req.query)
    const current = query.page >>> 0 || 1

    let data = [{
      channel_code: "001",//
      channel_name: "佳兆业物业管理集团", //
      agency_code: "001001",//
      agency_name: "深圳佳兆业城市广场",//
      service_status: 0,//
      service_name: "", //
      service_mobile: "",//
      customer_name: "胡**", //
      customer_mobile: "18*******63",
      customer_id: "c001"
    }, {
      channel_code: "001",//
      channel_name: "佳兆业物业管理集团", //
      agency_code: "001002",//
      agency_name: "广州佳兆业城市广场",//
      service_status: 1,//
      service_name: "王小二", //
      service_mobile: "18025355623",//
      customer_name: "胡**", //
      customer_mobile: "18*******63",
      customer_id: "c002"
    }];

    if (window.location.href.indexOf("customer/customerList_cs")>-1) {
      data = [{
        id:"011",
        name: "王小二",//
        mobile: "13076765012", //
        register_time: "2017-03-10 16:08:15",//
        last_login: "2017-03-10 16:08:15",//
        is_pnr: 0,//
        is_invest: 1, //
        available: 0,//
      },{
        id:"012",
        name: "胡小二",//
        mobile: "13076765014", //
        register_time: "2017-03-10 16:08:15",//
        last_login: "2017-03-10 16:08:15",//
        is_pnr: 1,//
        is_invest: 0, //
        available: 0,//
      }]
    }


    res.json({
      status: "success",
      data: data,
      page: {
        current: current,
        total: 250
      }
    })
  },

  'POST /off/api/dpr/customer/assort/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '分配成功'
    })
  },

  'POST /off/api/dpr/customer/retrieve/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '回收成功'
    })
  },

  'POST /off/api/dpr/customer/commit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '上交成功'
    })
  },

  'POST /off/api/employee/tranfer_customer/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '分配成功'
    })
  },

}

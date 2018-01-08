const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {
  'POST /off/api/drp/fee_rule/new/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新增规则成功'
    })
  },

  'POST /off/api/drp/fee_rule/1/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '编辑规则成功'
    })
  },

  'POST /off/api/drp/fee_rule/1/delete/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '删除规则成功'
    })
  },

  'GET /off/api/drp/fee_rules/' (req, res) {
    console.info(req);


    res.json({
      status: "success",
      data:{
        fee_rules:[{
          id: "1",
          name: '佳兆业物业管理接团2017年1月-3月佣金分配计划', //规则名称
          start_end_time: '2017-01-01 00:00:00~2017-02-01 00:00:00',//生效时间段
          limit: '4.0',//佣金总配额
          rules: [
            {name: '一级', key: 'level_0', value: '3.0'},//各级佣金配额
            {name: '兼职客服', key: 'customer_service', value: '3.0'},
          ]
        },{
          id: "2",
          name: '佳兆业物业管理接团2017年3月-4月佣金分配计划', //规则名称
          start_end_time: '2017-01-01 00:00:00~2017-02-01 00:00:00',//生效时间段
          limit: '4.0',//佣金总配额
          rules: [
            {name: '一级', key: 'level_0', value: '3.0'},//各级佣金配额
            {name: '兼职客服', key: 'customer_service', value: '3.0'},
          ]
        }],
        channel: {
          name: '佳兆业物业集团', //组织名称
          rules: [
            {name: '一级', key: 'level_0' },//各级佣金配额
            {name: '二级', key: 'level_1'},
          ]
        }
      }
    })
  },

}

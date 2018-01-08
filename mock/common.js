const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {

  'GET /off/api/drp/agency/tree/' (req, res) {
    console.info(req);

    const query = qs.parse(req.query)
    const current=query.current>>>0||1

    res.json({
      status: "success",
      data:[{
        value: '000001',//id
        label: '佳兆业物业管理集团',//组织名称
        children: [{
          value: '0001001',
          label: '佳兆业物业（深圳）',

          children: [{
            value: '1001001',
            label: '前海广场',
          },{
            value: '1001002',
            label: '城市广场',
          }],
        },{
          value: '0001002',
          label: '佳兆业物业（广州）',
          children: [{
            value: '1002001',
            label: '天桥广场',
          },{
            value: '1002002',
            label: '天安广场',
          }],
        }],
      }, {
        value: '000002',
        label: '中航物业管理集团',
        children: [{
          value: '0002001',
          label: '中航物业（深圳）',
          children: [{
            value: '2001001',
            label: '中海广场',
          }],
        }],
      }],
      page: {
        current:current,
        total:250
      }
    })
  },

}

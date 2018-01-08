const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {
  'POST /off/api/drp/channel/new/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },

  'GET /off/api/drp/channel/' (req, res) {
    console.info(req);

    const query = qs.parse(req.query)
    const current=query.page>>>0||1

    res.json({
      status: "success",
      data:[{
        id:'008',
        code:2131221,
        agreement:{
          start_time:'2017-01-01 00:00:00',
          end_time:'2017-02-01 00:00:00'
        },
        name:"合作伙伴一",
        status:"状态值x",
        contact:{
          name:"业务联系人一",
          mobile:13076765013
        }
      }],
      page: {
        current:current,
        total:250
      }
    })
  },

}

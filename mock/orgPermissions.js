const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {

  'GET /off/api/drp/agency/rights/' (req, res) {

    console.info(req);

    const query = qs.parse(req.query)
    const current=query.page>>>0||1

    res.json({
      status: "success",
      data:[{
        name:"佳兆业物业（深圳）" ,//组织名称
        id:"0001001", //组织id
        code:"000" ,// 组织编号
        manager_username :"张三",//管理员姓名
        manager_real_name:"zhangsan",//管理员账号
        create_time:"2017-01-01 00:00:00", //创建时间
        status :"init",//状态
        is_leaf:false //是否叶子节点
      }],
      page: {
        current:current,
        total:250
      }
    })
  },

}

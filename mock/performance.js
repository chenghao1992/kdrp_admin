import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('performanceList', Mock.mock(
  {
    "data": [
      {
        "code": "101",
        "id": "8f99c5d7-2554-11e7-8bf5-a45e60ba345d",
        "is_bottom": false,
        "name": "佳兆业物业集团",
        "leader_name": "商务总监",
        "status": "running"
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

let performanceListData = global[dataKey]

module.exports = {
  'GET /off/api/drp/performance_report/' (req, res) {
    res.json(global[dataKey])
  }
}

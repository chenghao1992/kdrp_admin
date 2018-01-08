//const decoder = require('qs-iconv/decoder')('shift_jis');
//todo 不能解析中文

const qs = require('qs')
const Cookie = require('js-cookie')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('Manager', [
  {
    name: '管理员1',
    mobile: '13076765013',
    id:'001'
  },
  {
    name: '管理员2',
    mobile: '13076765018',
    id:'002'
  }
])

module.exports = {
  'GET /off/api/employee/query/' (req, res) {

    const query = qs.parse(req.query)
    const response = {
      status: "success",
      data: []
    }
    const d = global[dataKey].filter(function (item) {
      return item.name.indexOf(query.content)>-1 ||item.mobile.indexOf(query.content)>-1
    })

    if (d.length) {
      response.data=d;
    }
    res.json(response)
  }
}

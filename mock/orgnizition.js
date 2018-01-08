//const decoder = require('qs-iconv/decoder')('shift_jis');
//todo 不能解析中文

const qs = require('qs')
const Cookie = require('js-cookie')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('Manager', [
  {
    id:'007',
    tree:[

    ]
  }
])

module.exports = {
  'GET /api/drp/channel/007/tree/' (req, res) {
    const response = {
      status: "success",
      data: [{
        key: '1',
        title: '佳兆业物业管理集团',
        children: [{
          key: '11',
          title: '佳兆业物业广州分公司',
          children: [{
            key: '111',
            title: '广州佳兆业广场物业管理处',
          }],
        }, {
          key: '12',
          title: '佳兆业物业惠州分公司',
          children: [{
            key: '121',
            title: '惠州佳兆业广场物业管理处',
          }],
        }],
      }]
    }
    res.json(response)
  },
  'GET /api/drp/channel/008/tree/' (req, res) {
    const response = {
      status: "success",
      data: [{
        "title": "佳兆业物业管理集团",
        "key": "0-0",
        "manager": 'manager',
        "code": "001",
        "status": '',
        "children": [
          {
            "title": "佳兆业物业广州分公司",
            "key": "0-0-0",
            "code": "001001",
            "children": [
              {
                "title": "广州佳兆业广场物业管理处",
                "key": "0-0-0-0",
                "children": [
                  {
                    "title": "广州佳兆业广场物业管理处一",
                    "key": "0-0-0-0-0",
                    "children": [
                      {
                        "title": "广州佳兆业广场物业管理处二",
                        "key": "0-0-0-0-0-0"
                      }
                    ]
                  }
                ]
              },
              {
                "title": "0-0-0-1",
                "key": "0-0-0-1"
              },
              {
                "title": "0-0-0-2",
                "key": "0-0-0-2"
              }
            ]
          }
        ]
      }]
    }
    res.json(response)
  },
  'POST /off/api/drp/agency/new/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },
  'POST /api/drp/agency/0-0/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '修改成功'
    })
  },


  'GET /off/api/drp/agency/0-0' (req, res) {
    const response = {
      status: "success",
      message: '新建成功',
      data:{
        code: "007",
        parent: {
          name: '无'
        },
        name: "top level",
        manager:{
          id:"007",
          mobile:"13076765013",
          name:"管理员"
        }

      }
    }

    res.json(response)
  },
}

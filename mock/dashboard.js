import {color} from '../src/utils/theme'
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey;
dataKey = mockStorge('Dashboard', Mock.mock(
  {
    status: 'success',
    message: '',
    data: [
      {
        type: "statistics",
        args: {
          title: '历史统计（总公司）',
          col:16,
          data: [
            {
              icon: 'user',
              color: '#8fc9fb',
              title: '昨日新增客户数',
              number: 100
            }, {
              icon: 'pay-circle-o',
              color: '#d897eb',
              title: '昨日新增服务费(元)',
              number: 2220
            }, {
              icon: 'pay-circle-o',
              color: '#64ea91',
              title: '昨日年化投资金额(元)',
              number: 165
            }, {
              icon: 'user',
              color: '#8fc9fb',
              title: '当前客户数',
              number: 50
            }, {
              icon: 'pay-circle-o',
              color: '#d897eb',
              title: '本月累计服务费(元)',
              number: 650
            }, {
              icon: 'pay-circle-o',
              color: '#64ea91',
              title: '本月年化投资金额(元)',
              number: 1610
            }
          ]
        }
      },
      {
        type: "rank",
        args: {
          title: '下属组织业务排名',
          col:8,
          headers: [
            {title: '组织名称', dataIndex: 'name'},
            {title: '本月服务费', dataIndex: 'value'}
          ],
          data: [
            {
              name: '佳兆业物业（深圳）',
              value: 35000
            },
            {
              name: '佳兆业物业（深圳）',
              value: 25000
            },
            {
              name: '佳兆业物业（深圳）',
              value: 15000
            },
            {
              name: '佳兆业物业（深圳）',
              value: 5000
            },
            {
              name: '佳兆业物业（深圳）',
              value: 3500
            }
          ]
        }
      },
      {
        type: "statistics",
        args: {
          title: '历史统计（业务员）',
          col:16,
          data: [
            {
              icon: 'user',
              color: '#8fc9fb',
              title: '昨日新增客户数',
              number: 100
            }, {
              icon: 'pay-circle-o',
              color: '#d897eb',
              title: '昨日新增服务费(元)',
              number: 2220
            }, {
              icon: 'pay-circle-o',
              color: '#64ea91',
              title: '昨日年化投资金额(元)',
              number: 165
            }, {
              icon: 'user',
              color: '#8fc9fb',
              title: '当前客户数',
              number: 50
            }, {
              icon: 'pay-circle-o',
              color: '#d897eb',
              title: '本月累计服务费(元)',
              number: 650
            }, {
              icon: 'pay-circle-o',
              color: '#64ea91',
              title: '本月年化投资金额(元)',
              number: 1610
            }
          ]
        }
      },
      {
        type: "rank",
        args: {
          title: '最佳业务员龙虎榜',
          col:8,
          headers: [
            {title: '姓名', dataIndex: 'name'},
            {title: '本月服务费', dataIndex: 'value'}
          ],
          data: [
            {
              name: '王小二',
              value: 35000
            },
            {
              name: '王小二',
              value: 25000
            },
            {
              name: '李老三',
              value: 15000
            },
            {
              name: '李老三',
              value: 5000
            },
            {
              name: '李老三',
              value: 3500
            }
          ]
        }
      },
      {
        type: "barCharts",
        args: {
          title: '服务费收入',
          col: 24,
          url: '/api/drp/agency_fee_column/'
        }
      },
      {
        type: "pieCharts",
        args: {
          title: '服务费收入来源',
          col: 24,
          data: {
            datas:[
              {name: '佳兆业物业（深圳）', value: 35000},
              {name: '佳兆业物业（广州）', value: 25000},
              {name: '佳兆业物业（北京）', value: 15000},
              {name: '佳兆业物业（上海）', value: 5000}
            ]
          }
        }
      },
      {
        type: "promotion",
        args: {
          title: '我要推广',
          col: 24,
          data:{
            url: 'https://www.kaisafax.com/register/index?ref=2WAJXR'
          }
        }
      }
    ]
  }
));

let dataKeyBar = mockStorge('queryIncomeBar', Mock.mock(
  {
    status: 'success',
    message: '',
    data: {
      datas:[
        {name: '所有',data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        {name: '机构',data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        {name: '业务员',data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
      ],
      days:['2016年09月28日','2016年09月29日','2016年09月30日','2016年09月31日','2016年09月32日','2016年09月33日','2016年09月34日','2016年09月35日','2016年09月36日','2016年09月37日']
    }
  }
))

module.exports = {
  'GET /off/api/drp/dashboard/' (req, res) {
    res.json(global[dataKey])
  },
  'GET /off/api/drp/agency_fee_column/' (req, res) {
    res.json(global[dataKeyBar])
  }
}

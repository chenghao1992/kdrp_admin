const Mock = require('mockjs')
const mockData = [
  require('../../mock/users'),
  require('../../mock/app'),
  require('../../mock/dashboard'),
  require('../../mock/manager'),
  require('../../mock/orgnizition'),
  require('../../mock/partner'),
  require('../../mock/servicecharge'),
  require('../../mock/servicechargeDetail'),
  require('../../mock/personal'),
  require('../../mock/company'),
  require('../../mock/commission'),
  require('../../mock/commissionMain'),
  require('../../mock/commissionSub'),
  require('../../mock/commissionLast'),
  require('../../mock/costAudit'),
  require('../../mock/costPay'),
  require('../../mock/feeRule'),
  require('../../mock/staffList'),
  require('../../mock/orgPermissions'),
  require('../../mock/common'),
  require('../../mock/customer'),
  require('../../mock/performance'),
]

function serialize (str) {
  let paramArray = str.split('&')
  let query = {}
  for (let param of paramArray) {
    query[param.split('=')[0]] = param.split('=')[1]
  }
  return query
}

for (let i of mockData) {
  for (let key in i) {
    if (i.hasOwnProperty(key)) {
      Mock.mock(eval(`/${key.split(' ')[1].replace(/\//g, '\\/')}/`), key.split(' ')[0].toLowerCase(), (options) => {
        if (key.split(' ')[0].toLowerCase() === 'get') {
         /* options.query = options.url.split('?')[1]
            ? serialize(options.url.split('?')[1])
            : (options.body ? serialize(options.body) : {})*/
          if (options.url.split('?')[1]) {
            options.query = serialize(options.url.split('?')[1])
          } else if (options.body) {
            options.query = serialize(options.body)
          } else {
            options.query = {}
          }
        }
        let res = {}
        let result = {}
        res.json = function (data) {
          result = data
        }
        i[key](options, res)
        return result
      })
    }
  }
}

Mock.setup({ timeout: '200-600' })

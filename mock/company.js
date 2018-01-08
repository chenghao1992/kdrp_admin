const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'


module.exports = {
  'POST /off/api/drp/agency/008/base_info/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },

  'POST /off/api/drp/agency/008/contact/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },

  'POST /off/api/drp/agency/008/finance/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },

  'POST /off/api/drp/agency/008/address/edit/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '新建成功'
    })
  },

  'POST /off/api/drp/agency/008/enable/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '启动成功',
      data:{
        status:"running"
      }
    })
  },

  'POST /off/api/drp/agency/008/disable/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '禁用成功',
      data:{
        status:"disable"
      }
    })
  },

  'POST /off/api/drp/agency/008/freeze/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '冻结成功',
      data:{
        status:"freezing"
      }
    })
  },

  'POST /off/api/drp/agency/008/unfreeze/' (req, res) {
    console.log(req)

    res.json({
      status: "success",
      message: '解冻成功',
      data:{
        status:"running"
      }
    })
  },

  'GET /off/api/drp/agency/008/detail/' (req, res) {
    res.json({
      status: "success",
      message: '新建成功',
      data: {
        status: "init",
        base_info: {
          code: "001",
          full_name: "公司全称",
          name: "公司简称"
        },
        contact: {
          business_contact: {
            name: "业务联系人姓名",
            mobile: 13076765913,
            email: "业务联系人邮箱",
            phone: 1028131232
          },
          finance_contact: {
            name: "财务联系人姓名",
            mobile: "财务联系人手机",
            email: "财务联系人邮箱",
            phone: "财务固定电话",
          }
        },
        finance: {
          bank_account: {
            bank: "中国工商银行",
            branch: "开户支行",
            name: "开户名",
            account_no: 12321
          },
          tax_no: 0,//公司纳税识别号
          tax_company_address: "公司地址",
          tax_company_phone: 12345
        },
        address: {
          manage_address: {
            province: "浙江",// 省
            city: "杭州",  // 市
            county: "西湖", // 区
            detail: "西湖畔", // 详细地址
          },
          invoice_address: {
            province: "浙江",// 省
            city: "杭州",  // 市
            county: "西湖", // 区
            detail: "西湖畔", // 详细地址
          }
        }
      }
    })
  },


}

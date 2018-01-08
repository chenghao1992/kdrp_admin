const Cookie = require('js-cookie')
import mockStorge from '../src/utils/mockStorge'
import menu from '../src/utils/menu'

const Mock = require('mockjs')
const qs = require('qs')

let dataKey = mockStorge('AdminUsers', [
  {
    username: 'guest',
    password: 'guest'
  },
  {
    username: '吴彦祖',
    password: '123456'
  }
])


module.exports = {
  'POST /off/api/login' (req, res) {
    const userItem = req.body
    const response = {
      success: false,
      message: ''
    }
    const d = global[dataKey].filter(function (item) {
      return item.username === userItem.username
    })
    if (d.length) {
      if (d[0].password === userItem.password) {
        const now = new Date()
        now.setDate(now.getDate() + 1)
        Cookie.set('user_session', now.getTime(), {path: '/'})
        Cookie.set('user_name', userItem.username, {path: '/'})
        response.message = '登录成功'
        response.success = true
      } else {
        response.message = '密码不正确'
      }
    } else {
      response.message = '用户不存在'
    }
    res.json(response)
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      message: ''
    }
    res.json(response)
  },

  'GET /api/user_info/' (req, res) {
    const response = {
      status: "success",
      data: {
        menu: menu,
        roles:[{
          name :"商务经理" ,  //角色名称
          key :"rolekey1",    //角色对应的关键字
          agency_id:"orgCode001", //角色所在组织ID
          agency_name:"城市广场",//角色所在组织名称
          is_active:true ,  // true 表示当前使用的角色
        },{
          name :"兼职客服" ,  //角色名称
          key :"rolekey2",    //角色对应的关键字
          agency_id:"orgCode002", //角色所在组织ID
          agency_name:"城市广场城市广场",
          is_active:false ,  // true 表示当前使用的角色
        }],
        user: {
          avatar: null
        },
        status:"running"
      },
      message: "user_info"//
    }

    res.json(response)
  },

  'POST /off/api/logout/' (req, res) {
    Cookie.remove('user_session', {path: '/'})
    Cookie.remove('user_name', {path: '/'})
    res.json({
      success: true,
      message: '退出成功'
    })
  },

  'GET /api/app/getMsgCode' (req,res){
    const newCode=Mock.Random.natural(1000, 9999)
    res.json({success: true, code:newCode})
  },

  'POST /off/api/role/switch/' (req, res) {
    console.log (req)

    res.json({
      status: "success",
      message: '切换成功'
    })
  },


}

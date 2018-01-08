import {color} from '../src/utils/theme'
const Mock = require('mockjs')
const qs = require('qs')
import mockStorge from '../src/utils/mockStorge'

let personalIfo = mockStorge('personalIfoData', Mock.mock({
  // "firstChunkData":{
  //   'sex':'男',
  //   'username':'Syntax Demo',
  //   'idNum':'421127199312023346',
  //   'name':'胡彦斌',
  //   'idNumPlace':'广州公安局',
  //   'secondPhone':"13411411111" ,
  //   'emergencyContact':'张三',
  //   'telephone':'1111111',
  //   'emergencyPhone':'19989898981',
  //   // 'email':'666@163.com',
  //   'photoUrl':'./assets/image/kaisa_logo.png',
  // },
  // "secondChunkData":{
  //   'phone':"13411411111" ,
  //   'email':'666@163.com',
  // },
  // "thirdChunkData":['佳兆业物业集团','佳兆业物业集团','佳兆业物业集团',],
  // "forthChunkData":{
  //
  // },


  "personal_info": {
    "sex": "男",
    "username": "Syntax Demo",
    "id_no": "421127199312023346",
    "id_publisher": "广州公安局",
    "emergency_contact": "张三",
    "emergency_mobile": "17089898981",
    "name": "胡彦斌",
    "phone":"1213456",
    "mobile2": "13411411111",
    "id": "12124545",
    'photoUrl':'./assets/image/kaisa_logo.png',
  },
  "safety_verfi": {
    "mobile": "13411411111",
    "email": "666@163.com"
  },
  "agency_info": [
    {
      "level_key": "佳兆业物业集团",
      "level_name": "一级组织"
    },
    {
      "level_key": "佳兆业物业集团",
      "level_name": "二级组织"
    },
  ],
  "kaisa_account_info": {
    // "name": "李四",
    // "id_no": "421127199312023346",
    // "mobile": "13333333333"
  },
  "address_info": {
    "home_address": {
        "region":["广东省","深圳市","罗湖区"],
        "detail": "国贸发展中心"
    },
    "work_address": {
        "region":["广东省","深圳市","罗湖区"],
        "detail": "国贸发展中心"
    }
  }

}))




let personalIfoData = global[personalIfo]
console.info(personalIfoData)

module.exports = {
  'GET /api/personal/personalData' (req,res){
    res.json(global[personalIfo])
  },
  'GET /api/personal/getCode' (req,res){
    const newCode=Mock.Random.natural(1000, 9999)
    res.json({success: true, code:newCode})
  },
  'POST /api/personal/changePwd' (req,res){
    res.json({success: true, code:1,msg:'修改成功'})
  },

}

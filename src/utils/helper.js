/**
 * Created by pengshuo on 17/6/13.
 */

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (str) => (
    str.slice(1).toUpperCase()
  ))
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  return format
}

function findPathInTree (value, tree, keyword) {
  let fullpath = [];

  (function findPath (v, t, k) {
    let flag = false
    for (let i = 0; i < t.length; i++) {
      if (t[i][k] === v) {
        flag = true
        fullpath.push(t[i][k])
        break
      }

      if (t[i].children && t[i].children.length) {
        fullpath.push(t[i][k])

        if (!findPath(v, t[i].children, k)) {
          fullpath.pop()
        } else {
          flag = true
          break
        }
      }
    }
    return flag
  }(value, tree, keyword))

  return fullpath
}


/* 报表对象转数组 参见：小幺鸡财务服务费报表*/
function trans2arr (obj) {
  for (let i in obj) {
    if (obj[i].range) {
      let range = obj[i].range
      let rangeNew = {}
      delete obj[i].range
      Object.keys(range).forEach(key => {
        rangeNew[`range_${key}`] = range[key]
      })
      Object.assign(obj[i], rangeNew)
    }
    if (obj[i].yesterday) {
      let yesterday = obj[i].yesterday
      let yesterdayNew = {}
      delete obj[i].yesterday
      Object.keys(yesterday).forEach(key => {
        yesterdayNew[`yesterday_${key}`] = yesterday[key]
      })
      Object.assign(obj[i], yesterdayNew)
    }
  }
  return obj
}


/* 金额格式化* 1234.456 ＝>1,234.46*/
function formatMoney (value) {
  if (value !== '' && value !== null) {
    let num = `${value}`
    num = num.toString().replace(/\$|,/g, '')
    // 获取符号(正/负数)
    let sign = (Number(num) === (num = Math.abs(num)))
    // 把指定的小数位先转换成整数.多余的小数位四舍五入
    num = Math.floor(num * Math.pow(10, 2) + 0.50000000001)
    // 求出小数位数值
    let cents = num % Math.pow(10, 2)
    // 求出整数位数值
    num = Math.floor(num / Math.pow(10, 2)).toString()
    // 把小数位转换成字符串,以便求小数位长度
    cents = cents.toString()
    // 补足小数位到指定的位数
    while (cents.length < 2) {
      cents = `0${cents}`
    }
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = `${num.substring(0, num.length - (4 * i + 3))},${num.substring(num.length - (4 * i + 3))}`
    }
    return (`${(sign ? '' : '-')}${num}.${cents}`)
  } else if (value === '0') {
    return '0.00'
  }
  return value
}


/* js加法精度 1.9272652+2.1675762517 :小数转整数相加，然后再除 */
function accAdd (arg1, arg2) {
  let r1
  let r2
  let m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/* 角色判断*/
function rolesCode (roles) {
  for (let i = 0; i < roles.length; i++) {
      // 渠道业务员/兼职客服
    if (roles[i].is_active && roles[i].key === 'channel_business') {
      return 'channel_business'
      // 商务总监
    } else if (roles[i].is_active && roles[i].key === 'channel_master') {
      return 'channel_master'
      // 商务经理
    } else if (roles[i].is_active && roles[i].key === 'channel_leader') {
      return 'channel_leader'
      // 渠道管理员
    } else if (roles[i].is_active && roles[i].key === 'channel_manager') {
      return 'channel_manager'
      // 财务
    } else if (roles[i].is_active && roles[i].key === 'finance') {
      return 'finance'
      // 出纳
    } else if (roles[i].is_active && roles[i].key === 'cashier') {
      return 'cashier'
    }
  }
  return true
}

export {
  findPathInTree,
  formatMoney,
  accAdd,
  trans2arr,
  rolesCode,
}

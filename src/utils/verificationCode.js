/**
 * Created by xiaoys on 2017/4/11.
 */

// example
/* <FormItem label='姓名：' hasFeedback {...formItemLayout}>
  {getFieldDecorator('name', {
    initialValue:'',
    rules: [
      {
        ...rules.name,
        message:"请填写姓名",
        required: true,
      }
    ]
  })(<Input />)}
</FormItem>*/

export const Rules = {
  // 手机号
  phoneNumber: {
    pattern: /^1[34578]\d{9}$/,
    message: '13、14、15、17、18开头，共11位数字!',

  },
  // 密码
  passWord: {
    pattern: /^([a-zA-Z0-9]|[_~!@#\$%\^&\*\(\)\-_\+=\[\]\{\}\|\\;:'",\.\/<>\?]){6,16}$/,
    message: '6-16位字符，至少包含数字、字母（区分大小写）、符号中的2种',
  },
  // 固定电话
  fixedNumber: {
    pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/,
    message: '请填写正确的固定电话',
  },
  // 身份证号码
  idNumber: {
    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    message: '请填写正确的身份证号码',
  },
  // 金额输入验证
  amount: {
    pattern: /^[0-9]+(.[0-9]{1,2})?$/,
    message: '最多保留两位小数且大于或等于零',
  },

  // 下面是各种内置验证规则，

  // 用户名 组织名称 开户支行 公司纳税识别号 组织代码
  name: {
    max: 50,
    message: '最多50个字符',
  },

  // 邮箱
  email: {
    type: 'email',
    message: '请填写正确的邮箱',
  },

  // 企业全称
  allName: {
    max: 200,
    message: '最多200个字符',
  },
  // 企业简称
  lessName: {
    max: 20,
    message: '最多20个字符',
  },

  // 经营地址－详细地址 发票地址－详细地址 工作地址 居住地址
  justAddress: {
    max: 255,
    message: '最多255个字符',
  },
  // 数字输入 组织编码 银行账号
  justNumber: {
    pattern: /^\d+$/,
    message: '请输入数字',
  },
  // 数组输入
  justArray: {
    type: 'array',
    message: '请选择组织',
  },
  // 布尔值
  justBoolean: {
    type: 'boolean',
    message: '请选择是否担任兼职客服',
  },
}


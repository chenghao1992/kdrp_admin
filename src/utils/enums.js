/**
 * Created by pengshuo on 17/3/29.
 */
export const BANK = [
  '中国工商银行',
  '中国建设银行',
  '中国银行',
  '中国农业银行',
  '交通银行',
  '招商银行',
  '中信银行',
  '中国民生银行',
  '兴业银行',
  '上海浦东发展银行',
  '中国邮政储蓄银行',
  '中国光大银行',
  '平安银行',
  '华夏银行',
  '北京银行',
  '广发银行',
  '上海银行',
  '江苏银行',
  '恒丰银行',
  '浙商银行',
]

export const COMPANY_STATUS = {
  init: '待启用',
  running: '正常',
  freezing: '冻结',
  disable: '已销户',
}

export const DISTRIBUTION = {
  0: '没有分配',
  1: '有分配',
}

export const BOOLEAN = {
  0: '否',
  1: '是',
}

export const BOOLEAN_TWO = [
  {
    name: '有',
    value: '1',
  }, {
    name: '无',
    value: '0',
  },
]

/* 费用审核状态*/
export const COSTAUDIT_STATUS_ALL = [
  {
    name: '全部',
    value: '',
  }, {
    name: '待审核',
    value: 'checking',
  }, {
    name: '审核通过',
    value: 'check_agreed',
  }, {
    name: '审核不通过',
    value: 'check_refused',
  },
]
export const COSTAUDIT_STATUS = {
  checking: '待审核',
  check_agreed: '审核通过',
  check_refused: '审核不通过',
}

/* 费用发放状态*/
export const COSTPAY_STATUS_ALL = [
  {
    name: '全部',
    value: '',
  }, {
    name: '审核通过',
    value: 'check_agreed',
  }, {
    name: '发放中',
    value: 'pay_agreed',
  }, {
    name: '拒绝发放',
    value: 'pay_refused',
  }, {
    name: '发放成功',
    value: 'pay_success',
  }, {
    name: '发放失败',
    value: 'pay_fail',
  },
]
export const COST_STATUS = {
  checking: '待审核',
  check_agreed: '审核通过',
  check_refused: '审核不通过',
  pay_agreed: '发放中',
  pay_refused: '拒绝发放',
  pay_success: '发放成功',
  pay_fail: '发放失败',
}

export const STAFFLIST_STATUS = [
  {
    name: '未激活',
    value: 'init',
  }, {
    name: '正常',
    value: 'running',
  }, {
    name: '冻结',
    value: 'freezing',
  }, {
    name: '已销户',
    value: 'disable',
  },
]

export const STAFFLIST_STATUS_ALL = {
  init: '未激活',
  running: '正常',
  freezing: '冻结',
  disable: '已销户',
}

export const STAFFLIST_ROLES = {
  customer_service: '兼职客服',
}

export const TASK_TYPE = {
  import: '导入',
  export: '导出',
}

export const STATUS_TAG_COLOR = {
  部分成功: 'orange',
  失败: 'red',
  成功: 'green',
}

export const STATUS_TAG_COLOR_PLUS = {
  warn: 'orange',
  fail: 'red',
  success: 'green',
  wait: '#666',
  init: 'gary',
}

export const PERSONAL_STATUS = {
  init: '未激活',
  running: '解冻',
  freezing: '冻结',
  disable: '注销',
}

export const CUSTOMER_INVEST = [
  { name: '客户本人', id: '32131212' },
  { name: '客户母亲', id: '321d212' },
  { name: '客户父亲', id: '321d31212' },
]


export const OSS_CODE = {
  AccessDenied: '拒绝访问',
  BucketAlreadyExists: 'Bucket已经存在',
  BucketNotEmpty: 'Bucket不为空',
  CallbackFailed: '上传回调失败',
  EntityTooLarge: '实体过大',
  EntityTooSmall: '实体过小',
  FieldItemTooLong: 'Post请求中表单域过大',
  FilePartInterity: '文件Part已改变',
  FilePartNotExist: '文件Part不存在',
  FilePartStale: '文件Part过时',
  IncorrectNumberOfFilesInPOSTRequest: 'Post请求中文件个数非法',
  InvalidArgument: '参数格式错误',
  InvalidAccessKeyId: 'AccessKeyId不存在',
  InvalidBucketName: '无效的Bucket名字',
  InvalidDigest: '无效的摘要',
  InvalidEncryptionAlgorithmError: '指定的熵编码加密算法错误',
  InvalidObjectName: '无效的Object名字',
  InvalidPart: '无效的Part',
  InvalidPartOrder: '无效的part顺序',
  InvalidPolicyDocument: '无效的Policy文档',
  InvalidTargetBucketForLogging: 'Logging操作中有无效的目标bucket',
  InternalError: 'OSS内部发生错误',
  MalformedXML: 'XML格式非法',
  MalformedPOSTRequest: 'Post请求的body格式非法',
  MaxPOSTPreDataLengthExceededError: 'Post请求上传文件内容之外的body过大',
  MethodNotAllowed: '不支持的方法',
  MissingArgument: '缺少参数',
  MissingContentLength: '缺少内容长度',
  NoSuchBucket: 'Bucket不存在',
  NoSuchKey: 'Object不存在',
  NoSuchUpload: 'Multipart Upload ID不存在',
  NotImplemented: '无法处理的方法',
  ObjectNotAppendable: '不是可追加文件',
  PositionNotEqualToLength: 'Append的位置和文件长度不相等',
  PreconditionFailed: '预处理错误',
  RequestTimeTooSkewed: '发起请求的时间和服务器时间超出15分钟',
  RequestTimeout: '请求超时',
  RequestIsNotMultiPartContent: 'Post请求content-type非法',
  DownloadTrafficRateLimitExceeded: '下载流量超过限制',
  UploadTrafficRateLimitExceeded: '上传流量超过限制',
  SignatureDoesNotMatch: '签名错误',
  TooManyBuckets: 'Bucket数目超过限制',
}


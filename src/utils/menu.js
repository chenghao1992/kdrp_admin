module.exports = [
  {
    key: 'dashboard',
    name: '管理看板',
    icon: 'laptop',
  },
  {
    key: 'cost',
    name: '费用结算',
    icon: 'pay-circle-o',
    child: [
      {
        key: 'costAudit',
        name: '费用审核',
      },
      {
        key: 'costPay',
        name: '费用发放',
      },
    ],
  },
  {
    key: 'channel',
    name: '渠道管理',
    icon: 'usb',
    child: [
      {
        key: 'partner',
        name: '合作伙伴',
      },
    ],
  },
  {
    key: 'organization',
    name: '组织管理',
    icon: 'team',
    child: [
      {
        key: 'manage',
        name: '组织架构',
      },
    ],
  },
  {
    key: 'orgPermissions',
    name: '组织权限',
    icon: 'exception',
    child: [
      {
        key: 'orgPermission_lo',
        name: '组织权限',
      },
    ],
  },
  {
    key: 'staff',
    name: '员工管理',
    icon: 'idcard',
    child: [
      {
        key: 'staffList',
        name: '员工管理',
      },
    ],
  },
  {
    key: 'customer',
    name: '客户管理',
    icon: 'contacts',
    child: [
      {
        key: 'customerList_mng', // 管理员
        name: '客户管理',
      },
      {
        key: 'customerList_cs', // 兼职客服
        name: '客户管理',
      },
      {
        key: 'customerList_cs_detail',
        name: '客户详情',
      },
      {
        key: 'customerList_cs_new',
        name: '联系人详情',
      },
      {
        key: 'customerList_bd', // 商务总监
        name: '客户管理',
      },
    ],
  },
  {
    key: 'report',
    name: '报表查询',
    icon: 'file-text',
    child: [
      {
        key: 'report_finance', // 财务
        name: '佣金报表',
      },
      {
        key: 'report_agency', // 机构
        name: '佣金报表',
      },
      {
        key: 'performance', // 机构
        name: '业绩报表',
      },
      {
        key: 'report_employee', // 末级下兼职客服
        name: '佣金报表',
      },
      {
        key: 'report_person', // 兼职客服个人
        name: '佣金报表',
      }, {
        key: 'report_staff_organization',
        name: '职工投资统计-按组织',
      }, {
        key: 'report_staff_person',
        name: '职工投资统计-按个人',
      },
    ],
  },
  {
    key: 'servicecharge',
    name: '服务费管理',
    icon: 'pay-circle-o',
    child: [
      {
        key: 'extra',
        name: '服务费管理提取',
      },
    ],
  },
  {
    key: 'personal',
    name: '个人管理',
    icon: 'user',
    child: [
      {
        key: 'personalInfo',
        name: '个人信息',
      },
      {
        key: 'changePwd',
        name: '修改密码',
      },
    ],
  },
  {
    key: 'company',
    name: '公司管理',
    icon: 'global',
    child: [
      {
        // bm为商务经理，m为服务商组织管理
        key: 'companyInformation_bm',
        name: '公司信息',
      },
      {
        key: 'companyInformation_m',
        name: '公司信息',
      },
    ],
  }, {
    key: 'task',
    name: '任务',
    child: [
      {
        key: 'taskList',
        name: '任务列表',
      },
      {
        key: 'taskDetail',
        name: '任务详情',
      },
    ],
  }, {
    key: 'agreements',
    name: '辅助协议详情',
    icon: 'file-text',
  }, {
    key: 'mechanismStaff',
    name: '机构职工管理',
    icon: 'solution',
    child: [
      {
        key: 'staffInvestList',
        name: '职工投资统计报表',
      }, {
        key: 'mechanismStaffMaintain',
        name: '职工维护',
      },
    ],
  }, {
    key: 'maintainApp',
    name: 'APP内容维护',
    icon: 'calculator',
    child: [
      {
        key: 'advertisingMap',
        name: '广告图维护',
      }, {
        key: 'consultationArticle',
        name: '资讯文章维护',
      }, {
        key: 'consultationColumn',
        name: '资讯栏目维护',
      }, {
        key: 'commonProblem',
        name: '常见问题维护',
      }, {
        key: 'addArticle',
        name: '文章维护',
      }, {
        key: 'commonProblemAdd',
        name: '常见问题维护',
      }, {
        key: 'showArticle',
        name: '查看文章',
      },
    ],
  },
  /* {
   key: 'users',
   name: '用户管理',
   icon: 'user'
   },
   {
   key: 'role',
   name: '测试组件页面',
   icon: 'user'
   },
   {
   key: 'role1',
   name: '测试组件页面1',
   icon: 'user'
   },
   {
   key: 'ui',
   name: 'UI组件',
   icon: 'camera-o',
   clickable: false,
   child: [
   {
   key: 'ico',
   name: 'Ico 图标'
   },
   {
   key: 'search',
   name: 'Search 搜索'
   }
   ]
   },
   {
   key: 'navigation',
   name: '测试导航',
   icon: 'setting',
   child: [
   {
   key: 'navigation1',
   name: '二级导航1'
   },
   {
   key: 'navigation2',
   name: '二级导航2',
   child: [
   {
   key: 'navigation21',
   name: '三级导航1'
   },
   {
   key: 'navigation22',
   name: '三级导航2'
   }
   ]
   }
   ]
   }*/
]

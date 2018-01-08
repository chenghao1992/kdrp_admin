import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

// "/"下面每个路由进入的时候都监听onEnter，然后去发请求查询他的权限，如果返回没有权限则退出登录跳转到登录页面。

export default function ({history, app}) {
  /**
   *
   * callback为数据返回后成功的回调，因此可以根据不同路由dispatch不同的数据到不同的model
   * 还有菜单
   */
  const checkAuth = (nextState, replace, next, callback) => {
    const keys = nextState.location.pathname.split("/");
    const key = keys[keys.length - 1];
    const path = nextState.location.query.id ?
    nextState.location.pathname + "?id=" + nextState.location.query.id
      : nextState.location.pathname;

    app._store.dispatch({
      type: "app/queryUserInfo",
      payload: {
        path: path,
      },
      routesCallback: {
        redirect: function (path) {
          replace(path);
          next();
        },
        next: function () {
          next();
        },
        /*login: function () {
         app._store.dispatch({
         type: "app/clearUserInfo"
         })
         }*/
      }
    })
  }

  const routes = [
    // 把login页面单独抽出来
    {
      path: 'login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Login/index'))
        }, 'login')
      }
    },
    {
      path: 'logout',
      getComponent (nextState, cb) {
        require.ensure([], require => {
        }, 'logout')
      }
    },
    {
      path: 'forgotPassword',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/forgotPassword'))
          cb(null, require('./routes/Forgot'))
        }, 'forgotPassword')
      }
    },
    {
      path: '/',
      component: App,
      indexRoute: {onEnter: (nextState, replace) => replace('/login')},
      /*getIndexRoute (nextState, cb) {
       require.ensure([], require => {
       registerModel(app, require('./models/dashboard'))
       cb(null, {component: require('./routes/dashboard')})
       }, 'dashboard')
       },*/
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          onEnter: function (nextState, replace, next) {
            checkAuth(nextState, replace, next, function () {
              //callback function,may be don't need.
            });

          },
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            }, 'dashboard')
          }
        },
        {
          //费用结算
          path: 'cost',
          name: 'cost',
          indexRoute: {onEnter: (nextState, replace) => replace('/cost/costClear')},

          childRoutes: [
            {
              path: 'costAudit',
              name: 'costAudit',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/costAudit'));
                  cb(null, require('./routes/Cost/costAudit'))
                }, 'costAudit')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
            {
              path: 'costPay',
              name: 'costPay',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/costPay'));
                  cb(null, require('./routes/Cost/costPay'))
                }, 'costPay')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //渠道管理
          path: 'channel',
          name: 'channel',
          indexRoute: {onEnter: (nextState, replace) => replace('/channel/partner')},
          childRoutes: [
            {
              path: 'partner',
              name: 'partner',
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/partner'))
                  cb(null, require('./routes/Partner/list'))
                }, 'partner')
              }
            },
            {
              path: 'partnerAdd',
              name: 'partnerAdd',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/partnerAdd'))
                  cb(null, require('./routes/Partner/add'))
                }, 'partnerAdd')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
            {
              path: 'feeRule',
              name: 'feeRule',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/feeRule'))
                  cb(null, require('./routes/Fee/rule'))
                }, 'feeRule')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //组织架构管理
          path: 'organization',
          name: 'organization',
          indexRoute: {onEnter: (nextState, replace) => replace('/organization/manage')},
          childRoutes: [
            {
              path: 'manage',
              name: 'manage',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/orgnizitionManage'));
                  registerModel(app, require('./models/selectOrgnizition'));
                  registerModel(app, require('./models/selectManager'));
                  cb(null, require('./routes/Orgnizition/manage'))
                }, 'manage')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //组织权限
          path: 'orgPermissions',
          name: 'orgPermissions',
          indexRoute: {onEnter: (nextState, replace) => replace('/orgPermissions/orgPermission_lo')},
          childRoutes: [
            {
              path: 'orgPermission_lo',
              name: 'orgPermission_lo',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/orgPermissionsLo'));
                  cb(null, require('./routes/OrgPermissions/lorg'))
                }, 'orgPermission_lo')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'orgPermission_lp',
              name: 'orgPermission_lp',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/orgPermissionsLp'));
                  cb(null, require('./routes/OrgPermissions/lperson'))
                }, 'orgPermission_lp')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //客户管理
          path: 'customer',
          name: 'customer',
          indexRoute: {onEnter: (nextState, replace) => replace('/customer/customerList_mng')},
          childRoutes: [
            {
              path: 'customerList_mng',
              name: 'customerList_mng',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/customerListMng'));
                  registerModel(app, require('./models/selectSalesman'));
                  registerModel(app, require('./models/selectSalesmanAgc'));
                  cb(null, require('./routes/Customer/listMng'))
                }, 'customerList_mng')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'customerList_cs',
              name: 'customerList_cs',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/customerListCs'));
                  registerModel(app, require('./models/selectSalesman'));
                  cb(null, require('./routes/Customer/listCs'))
                }, 'customerList_cs')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              }
            }, {//兼职客服页面 客户详情
              path: 'customerList_cs_detail',
              name: 'customerList_cs_detail',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/customerListCsDetail'));
                  cb(null, require('./routes/Customer/customerListCsDetail'))
                }, 'customerList_cs_detail')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {//兼职客服页面 新建联系人
              path: 'customerList_cs_new',
              name: 'customerList_cs_new',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/customerListCsNew'));
                  cb(null, require('./routes/Customer/customerListCsNew'))
                }, 'customerList_cs_new')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'customerList_bd',
              name: 'customerList_bd',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/customerListBd'));
                  cb(null, require('./routes/Customer/customerListBd'))
                }, 'customerListBd')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //查看公司信息
          path: 'company',
          name: 'company',
          indexRoute: {onEnter: (nextState, replace) => replace('/company/companyInformation_m')},
          childRoutes: [
            {
              path: 'companyInformation_bm',
              name: 'companyInformation_bm',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/company'));
                  cb(null, require('./routes/Company/information'))
                }, 'companyInformation_bm')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'companyInformation_m',
              name: 'companyInformation_m',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/company'));
                  cb(null, require('./routes/Company/information'))
                }, 'companyInformation_m')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //报表查询
          path: 'report',
          name: 'report',
          indexRoute: {onEnter: (nextState, replace) => replace('/report/reports')},
          childRoutes: [
            {
              path: 'report_finance',
              name: 'report_finance',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commission'));
                  cb(null, require('./routes/Report/commission'))
                }, 'report_finance')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            }, {
              path: 'report_agency',
              name: 'report_agency',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commissionMain'));
                  cb(null, require('./routes/Report/commissionMain'))
                }, 'report_agency')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'performance',
              name: 'report_performance',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/performance'));
                  cb(null, require('./routes/Report/performance'))
                }, 'report_performance')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () { });
              },
            }, {
              path: 'report_employee',
              name: 'report_employee',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commissionSub'));
                  cb(null, require('./routes/Report/commissionSub'))
                }, 'report_employee')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'report_person',
              name: 'report_person',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commissionLast'));
                  cb(null, require('./routes/Report/commissionLast'))
                }, 'report_person')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },{ //职工投资报表 组织
              path: 'report_staff_organization',
              name: 'report_staff_organization',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/reportStaffOrganization'));
                  cb(null, require('./routes/Report/reportStaffOrganization'))
                }, 'report_staff_organization')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },{ //职工投资报表 个人
              path: 'report_staff_person',
              name: 'report_staff_person',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/reportStaffPerson'));
                  cb(null, require('./routes/Report/reportStaffPerson'))
                }, 'report_staff_person')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        }, {
          //服务费管理
          path: 'servicecharge',
          name: 'servicecharge',
          indexRoute: {onEnter: (nextState, replace) => replace('/servicecharge/extra')},
          childRoutes: [
            {
              path: 'extra',
              name: 'extra',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/serviceCharge'));
                  cb(null, require('./routes/Servicecharge/extra'))
                }, 'extra')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
            {
              path: 'extraDetail',
              name: 'extraDetail',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/serviceChargeDetail'));
                  cb(null, require('./routes/Servicecharge/detail'))
                }, 'extraDetail')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        },

        //个人管理
        {
          path: 'personal',
          name: 'personal',
          indexRoute: {onEnter: (nextState, replace) => replace('/personal/personalInfo')},

          childRoutes: [
            {
              path: 'personalInfo',
              name: 'personalInfo',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/personal'));
                  cb(null, require('./routes/personal/personalInfo'))
                }, 'personalInfo')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
            {
              path: 'changePwd',
              name: 'changePwd',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/personal'));
                  cb(null, require('./routes/personal/changePwd'))
                }, 'changePwd')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }
          ]
        },
        //员工管理
        {
          path: 'staff',
          name: 'staff',
          indexRoute: {onEnter: (nextState, replace) => replace('/staff/staffList')},
          childRoutes: [
            {
              path: 'staffList',
              name: 'staffList',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/staffList'));
                  cb(null, require('./routes/staff/staffList'))
                }, 'staffList')
              },

              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
          ]
        },
        //任务
        {
          path: 'task',
          name: 'task',
          indexRoute: {onEnter: (nextState, replace) => replace('/task/taskList')},
          childRoutes: [
            {
              path: 'taskList',
              name: 'taskList',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/taskList'));
                  cb(null, require('./routes/Task/list'))
                }, 'taskList')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            }, {
              path: 'taskDetail',
              name: 'taskDetail',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/taskDetail'));
                  cb(null, require('./routes/Task/detail'))
                }, 'taskDetail')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });

              },
            },
          ]
        },
        //协议内容
        {
          path: 'agreements',
          name: 'agreements',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/agreements'));
              cb(null, require('./routes/agreements'))
            }, 'agreement')
          },
          onEnter: function (nextState, replace, next) {
            checkAuth(nextState, replace, next, function () {
            });

          },
        },
        //机构员工管理
        {
          path: 'mechanismStaff',
          name: 'mechanismStaff',
          indexRoute: {onEnter: (nextState, replace) => replace('/mechanismStaff/staffInvestList')},
          childRoutes: [
            {
              path: 'staffInvestList',
              name: 'staffInvestList',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/staffInvestList'));
                  cb(null, require('./routes/mechanismStaff/staffInvestList'))
                }, 'staffInvestList')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },{
              path: 'mechanismStaffMaintain',
              name: 'mechanismStaffMaintain',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/mechanismStaffMaintain'));
                  cb(null, require('./routes/mechanismStaff/mechanismStaffMaintain'))
                }, 'mechanismStaffMaintain')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            }
          ]
        },
        //APP内容维护
        {
          path: 'maintainApp',
          name: 'maintainApp',
          indexRoute: {onEnter: (nextState, replace) => replace('/maintainApp/advertisingMap')},
          childRoutes: [
            {
              path: 'advertisingMap',
              name: 'advertisingMap',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/advertisingMap'));
                  cb(null, require('./routes/MaintainApp/advertisingMap'))
                }, 'advertisingMap')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },{
              path: 'consultationArticle',
              name: 'consultationArticle',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/consultationArticle'));
                  cb(null, require('./routes/MaintainApp/consultationArticle'))
                }, 'consultationArticle')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },{
              path: 'addArticle',
              name: 'addArticle',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/consultationArticleDetail'));
                  cb(null, require('./routes/MaintainApp/addArticle'))
                }, 'addArticle')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },
            {
              path: 'showArticle',
              name: 'showArticle',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/showArticle'));
                  cb(null, require('./routes/MaintainApp/showArticle'))
                }, 'showArticle')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },
            {
              path: 'consultationColumn',
              name: 'consultationArticle',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/consultationColumn'));
                  cb(null, require('./routes/MaintainApp/consultationColumn'))
                }, 'consultationColumn')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },{
              path: 'commonProblem',
              name: 'commonProblem',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commonProblem'));
                  cb(null, require('./routes/MaintainApp/commonProblem'))
                }, 'commonProblem')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },{
              path: 'commonProblemAdd',
              name: 'commonProblemAdd',
              getComponent (nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/commonProblemEdit'));
                  cb(null, require('./routes/MaintainApp/commonProblemAdd'))
                }, 'commonProblemAdd')
              },
              onEnter: function (nextState, replace, next) {
                checkAuth(nextState, replace, next, function () {
                  //callback function,may be don't need.
                });
              },
            },
          ]
        },
        /*{
         path: 'users',
         name: 'users',
         getComponent (nextState, cb) {
         require.ensure([], require => {
         registerModel(app, require('./models/users'))
         cb(null, require('./routes/users'))
         }, 'users')
         },
         onEnter: function (nextState, replace, next) {
         checkAuth(nextState, replace, next, function () {
         //callback function,may be don't need.
         });

         },
         },{
         path: 'role',
         name: 'role',
         getComponent (nextState, cb) {
         require.ensure([], require => {
         registerModel(app, require('./models/role'));
         cb(null, require('./routes/Role'))
         }, 'role')
         },
         }, {
         path: 'role1',
         name: 'role1',
         getComponent (nextState, cb) {
         require.ensure([], require => {
         registerModel(app, require('./models/selectManager'))
         cb(null, require('./routes/Role1'))
         }, 'role1')
         }
         }, {
         path: 'ui/ico',
         name: 'ui/ico',
         getComponent (nextState, cb) {
         require.ensure([], require => {
         cb(null, require('./routes/ui/ico'))
         }, 'ui-ico')
         }
         }, {
         path: 'ui/search',
         name: 'ui/search',
         getComponent (nextState, cb) {
         require.ensure([], require => {
         cb(null, require('./routes/ui/search'))
         }, 'ui-search')
         }
         }, */

        {
          path: '403',
          name: '403',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/403'))
            }, '403')
          }
        }, {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            }, 'error')
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes}/>
}

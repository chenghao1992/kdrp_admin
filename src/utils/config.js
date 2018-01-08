
/* 下面的注释不要删！*/
/* global NOT_PROD*/

import img1 from '../../assets/kaisa_logo.png'

module.exports = {
  name: '兼职客服管理系统',
  prefix: 'kdrp',
  footerText: '© 2017 深圳佳兆业金融集团 版权所有',
  logoSrc: img1,
  logoText: '兼职客服管理系统',
  needLogin: true,
  uploadSrc: NOT_PROD ? 'http://testkdrp.oss-cn-shenzhen.aliyuncs.com' : 'http://kdrp.oss-cn-shenzhen.aliyuncs.com',
  goToKaisafaxUrl: NOT_PROD ? 'https://testwww.kaisafax.com/kaisafax-web/login/index' : 'https://kaisafax.com/login/index',
  getDomainName: NOT_PROD ? 'http://test-drp.shenxin99.com' : 'http://prm.sxfax.com',
  getArticleUrl: NOT_PROD ? '/m' : '',
}


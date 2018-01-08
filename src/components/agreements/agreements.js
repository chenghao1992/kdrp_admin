import React, { PropTypes } from 'react'
import { Form, Button, Alert } from 'antd'
import { Link } from 'dva/router'
import styles from '../common_list.less'
import classNames from 'classnames'


function Agreements ({ id, agreeTexts, statusType }) {
  const handleButtonClick = () => {
    agreeTexts(id)
  }

  return (
    <div>
      <h2 className={classNames(styles.common_padding_t30, styles.common_padding_b20, styles.common_t_center)}>自愿放弃平台转介绍关系及收益与兼职客服管理系统辅助服务协议</h2>
      <div style={{ height: 20, width: '100%', borderTopColor: '#ebebeb', borderTopWidth: 1, borderTopStyle: 'solid' }}></div>
      <div className={styles.common_padding_t20} style={{ height: 600, overflow: 'auto', marginLeft: 35 }}>
        <p className={styles.common_f_size}>甲乙双方根据《中华人民共和国合同法》，在诚实、自愿、平等、互利的基础上，为保护双方的合法权益，减少纠纷，经双方协调一致，达成以下协议。</p>
        <p className={styles.common_f_size}> 一、合作模式</p>
        <p className={styles.common_f_size}>1、 乙方自愿放弃由甲方运营的“佳兆业金服”平台原转介绍推广方案的转介绍关系及收益；</p>
        <p className={styles.common_f_size}>2、乙方为甲方提供客服辅助服务，协助具有投资意向的用户完成在甲方指定网站的注册、开户、充值、投资等操作，并据此获得服务报酬。</p>
        <p className={styles.common_f_size}> 二、双方的责任与权利</p>
        <p className={styles.common_f_size}>（一）甲方的责任和权利</p>
        <p className={styles.common_f_size}>1、甲方有权对乙方行为进行审核、监督。</p>
        <p className={styles.common_f_size}>2、甲方向乙方提供客服行为准则、操作手册等并负责对乙方进行相关的业务培训。</p>
        <p className={styles.common_f_size}>3、甲方负责及时向乙方提供与客服有关的新政策、新标准等相关内容。</p>
        <p className={styles.common_f_size}>（二）乙方的责任与权利：</p>
        <p className={styles.common_f_size}>1、乙方须严格遵守甲方的业务流程以及相关的业务规定。</p>
        <p className={styles.common_f_size}>2、乙方应严格以甲方所提供的相关准则、行为规范作为客服行为准绳。</p>
        <p className={styles.common_f_size}>3、乙方根据甲方提供用户服务政策，采用合法方式向用户服务，不得弄虚作假。</p>
        <p className={styles.common_f_size}>4、未经甲方书面许可，乙方不得将甲方所提供的数据、客户信息、联系方式等对外披露或告知与本合作协议无关的第三方。</p>
        <p className={styles.common_f_size}>5、乙方完成客户服务经甲方认可后有权获得报酬。</p>
        <p className={styles.common_f_size}>6、乙方应妥善保管在甲方系统中的账户，不得向他人泄露或委托他人使用。</p>
        <p className={styles.common_f_size}>三、结算及支付方式</p>
        <p className={styles.common_f_size}>1、服务报酬支付标准以甲方兼职客服系统记录为准，且甲方有权根据业务的发展随时调整服务报酬支付的比例和标准，对此乙方无任何异议。</p>
        <p className={styles.common_f_size}>2、服务报酬发放至兼职客服关联的金服账户中。</p>
        <p className={styles.common_f_size}>3、根据国家规定，兼职客服的服务报酬须缴纳20%个人所得税，平台已代扣。</p>
        <p className={styles.common_f_size}>四、违约责任</p>
        <p className={styles.common_f_size}>（一）乙方未经甲方书面同意，擅自在本协议客服业务以外的事务中使用甲方的企业、产品的名称、标识、品牌等，或者将该使用权进行转让的，甲方将对乙方处以每次5000—10000元的处罚。</p>
        <p className={styles.common_f_size}>（二）乙方对甲方的客户、数据、技术等资料负有保密责任，除用于客服业务的，不可用在其他用途，更不可泄漏给第三方。乙方如有违约行为则须向甲方赔偿人民币5万元，甲方保留法律追究的权力。</p>
        <p className={styles.common_f_size}>（三）乙方完成约定辅助客服服务，甲方应支付服务报酬。</p>
        <p className={styles.common_f_size}>五、其它约定事项</p>
        <p className={styles.common_f_size}>（一）甲乙签署本协议并不能成为乙方和甲方因此成立雇用、合资、合伙或其它类似关系的证明。</p>
        <p className={styles.common_f_size}>（二）由于本合同有关事宜引起争议，合同双方应首先力求以友好协商的方式予以解决。如果友好协商后此争议仍未解决，任何一方有权向甲方所在地的法院起诉。</p>
        <p className={styles.common_f_size}>（三）按照本协议规定的各项原则所订立的附属文件为本协议的组成部分，经双方协商一致，可以更改、修订或补充本协议，补充协议与本合同具同等法律效力。</p>
        <p className={styles.common_f_size}>（四）本协议经双方盖章，并由双方负责人或其授权签约人签字生效。</p>
        <p className={styles.common_f_size}>（五）本协议采用线上签约方式，具有法律效力。</p>
      </div>
      <div className={styles.common_fr}>
        {
          statusType ?
            <div style={{ width: 200, marginTop: 5, height: 34 }}>
              <Button style={{ float: 'left', marginTop: 5 }} className={classNames(styles.common_margin_b10, styles.common_margin_l10)} type="primary">
                <Link to={{ pathname: '/dashboard' }}>
                  返回
                </Link>
              </Button>
              <div style={{ width: 125, float: 'right', marginTop: 5 }}>
                <Alert className={classNames(styles.common_margin_b10)} message="已签署" type="success" showIcon />
              </div>
            </div>
          :
            <div>
              <Button className={classNames(styles.common_margin_b10)}>
                <Link to={{ pathname: '/dashboard' }}>放 弃</Link>
              </Button>
              <Button onClick={handleButtonClick} className={classNames(styles.common_margin_b10, styles.common_margin_l10)} type="primary">我同意</Button>
            </div>
        }
      </div>
    </div>
  )
}

Agreements.propTypes = {
  id: PropTypes.string,
  agreeTexts: PropTypes.func,
  statusType: PropTypes.bool,
}

export default Form.create()(Agreements)

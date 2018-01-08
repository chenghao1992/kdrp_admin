import React, { PropTypes } from 'react'
import { Card, Col, Row, Form, Icon, Tag, Modal } from 'antd'
import styles from '../common_list.less'
import QRCode from 'qrcode-react'
import { goToKaisafaxUrl } from '../../utils/config'
import classNames from 'classnames'

function FourthChunk ({
  getKaisafaxAccountInfo,
  getBindingText,
  getKaisafaxCode,
  stopRefresh,
  refreshAccountNumber,
  refreshOpenAccounts,
  stopRefreshOpenAccount,
  onHandleCancel,
  modalVisibleOfCode,
  onHandleOk,
  editStatus,
}) {
  const Bindsuccess = () => {
    Modal.success({
      title: '注册绑定成功',
      content: '请关闭本窗口后，点击【存管账号开户】旁边刷新按钮确认存管账号开户状态。如未开户，请点击【去开户】按钮前往金服网站进行存管账号开户。',
    })
  }

  const goToBinding = () => {
    editStatus ? getBindingText(Bindsuccess) : ''
  }

  const refreshAccount = () => {
    editStatus ? refreshAccountNumber(false) : ''
  }

  const refreshOpenAccount = () => {
    editStatus ? refreshOpenAccounts(false) : ''
  }

  const handleCancel = () => {
    onHandleCancel(Bindsuccess)
  }

  const handleOk = () => {
    onHandleOk(Bindsuccess)
  }

  return (
    <Card title="金服账号关联" bordered>
      <Row gutter={40} className={styles.common_margin_b30}>
        <Row span={24}>
          <p>我们使用您的当前 <span style={{ color: '#000' }}>手机号码</span> 查询了您在金服网站<a href="https://www.kaisafax.com/" target="blank">www.Kaisafax.com</a>的账号注册、账号关联绑定、汇付/中信银行第三方存管账号开户状态显示在下方。请先完成账号关联和存管账号开户，否则无法收到您的推荐佣金。</p>
          <p>如果您之前没有在金服注册过，点击【去绑定】后我们将默认使用您的当前系统手机号自动为您注册金服账号。以后您可以使用该手机号及短信验证码密码登录金服网站。</p>
          <p>如果您之前已经拥有金服手机号，点击【去绑定】后，扫描弹出二维码进行绑定和存管开户操作。完成后点击刷新按钮确认关联</p>
        </Row>
        <Col className={styles.common_margin_t30} >

          <Col>
            <span className={styles.common_margin_l25}>账号关联:</span>
            {!getKaisafaxAccountInfo.bindingAccount ?
              <span>
                <Tag color="orange" className={styles.common_margin_l20}>账号未绑定</Tag>
                {stopRefresh ? <Icon onClick={refreshAccount} className={styles.common_f_skyBlue} type="sync" /> : <Icon type="loading" />}
                <a className={styles.common_margin_l10} onClick={goToBinding}>去绑定</a>
                {
                  getKaisafaxCode.codeStatus ?
                    <Modal
                      visible={modalVisibleOfCode}
                      title={"使用微信扫一扫"}
                      onCancel={handleCancel}
                      onOk={handleOk}
                      width={400}
                    >
                      <div style={{ marginLeft: 57 }}>
                        <QRCode value={getKaisafaxCode.getCodeOfKaisafax} size={256} />
                      </div>
                      <p className={classNames(styles.common_margin_t10, styles.common_t_center)}>请在授权成功后关闭窗口</p>
                    </Modal> : ''
                }
              </span> :
              <Tag color="green" className={styles.common_margin_l20}>已绑定</Tag>
            }
          </Col>

          <Col className={styles.common_margin_t20}>
            <span>存管账号开户:</span>

              <span>
                {!getKaisafaxAccountInfo.bindingAccount || !getKaisafaxAccountInfo.open_status ?
                  <span>
                    <Tag color="orange" className={styles.common_margin_l20}>未开户</Tag>
                    {stopRefreshOpenAccount ? <Icon onClick={refreshOpenAccount} className={styles.common_f_skyBlue} type="sync" /> : <Icon type="loading" />}
                    {editStatus ?
                      <span>
                    <a className={styles.common_margin_l10} href={goToKaisafaxUrl} target="blank">去开户</a>
                  </span> :
                      <a className={styles.common_margin_l10}>去开户</a>
                    }
                  </span> :
                  <Tag color="green" className={styles.common_margin_l20}>已开户</Tag>}
              </span>
          </Col>
        </Col>
      </Row>
    </Card>
  )
}

FourthChunk.propTypes = {
  getKaisafaxAccountInfo: PropTypes.object,
  getBindingText: PropTypes.func,
  getKaisafaxCode: PropTypes.object,
  stopRefresh: PropTypes.bool,
  refreshAccountNumber: PropTypes.func,
  refreshOpenAccounts: PropTypes.func,
  stopRefreshOpenAccount: PropTypes.bool,
  onHandleCancel: PropTypes.func,
  modalVisibleOfCode: PropTypes.bool,
  onHandleOk: PropTypes.func,
  editStatus: PropTypes.bool,
}

export default Form.create()(FourthChunk)

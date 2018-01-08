import React, { PropTypes } from 'react'
import { Button, Input, Row, Col, Alert } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRCode from 'qrcode-react'
import { Link } from 'dva/router'
import classNames from 'classnames'
import ImgCanvas from './imgCanvas'
import styles from './promotion.less'
// import { color } from '../../utils'

function Promotion ({ promotion, personText, personAgree }) {
  const imgProps = {
    userName: personText.personName,
    userImg: personText.personUrl,
    urlCode: promotion.url,
  }

  // console.log(imgProps)

  return (
    <Row>
      <Col xs={24} lg={12}>
        <Row>
          <Col>
            <p className={styles.labelp}>第一步：请点击查看并签署以下协议；</p>
            <div className={styles.btnboss}>
              <Link to={{ pathname: '/agreements' }}>《自愿放弃平台转介绍关系及收益与兼职客服管理系统辅助服务协议》</Link>
              {
                personAgree ?
                  <div style={{ width: 125, float: 'right', marginRight: 150 }}>
                    <Alert message="已签署" type="success" showIcon />
                  </div> :
                  <div style={{ width: 125, float: 'right', marginRight: 150 }}>
                    <Alert message="未签署" type="warning" showIcon />
                  </div>
              }
            </div>
            {
              personAgree ?
                <div>
                  <p className={styles.labelp}>第二步：使用推广素材开始推广；</p>
                  <p className={styles.inputp}>方式1：发送以下链接，即可邀请好友注册</p>
                  <p className={styles.inputp}><Input defaultValue={promotion.url} readOnly /></p>
                  <p className={classNames(styles.btn, styles.inputp)}>
                    <CopyToClipboard text={promotion.url}>
                      <Button disabled={!personAgree} type="primary">复制链接</Button>
                    </CopyToClipboard>
                  </p>
                  <p className={styles.inputp}>方式2：邀请好友扫描二维码直接进入手机注册页面</p>
                  <div>
                    <div>
                      <div id="QRCodeCanvas">
                        <QRCode value={promotion.url} width={170} height={170} />
                      </div>
                      <a download="专属二维码" id="downloadCode" href="" style={{ marginLeft: 20, display: 'block', marginTop: 10 }}>下载专属二维码</a>
                    </div>
                  </div>
                </div> : ''
            }
          </Col>
        </Row>

      </Col>
      {
        personAgree ?
          <Col xs={24} lg={12} >
            {
              personText.personName && personText.personUrl ? <ImgCanvas {...imgProps} /> : ''
            }
          </Col> : ''
      }
    </Row>

  )
}

Promotion.propTypes = {
  url: PropTypes.object,
  onCopy: PropTypes.func,
  promotion: PropTypes.object,
  personText: PropTypes.object,
  personAgree: PropTypes.bool,
}

export default Promotion

import React, { PropTypes } from 'react'
import { Button, Input, Row, Col } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRCode from 'qrcode-react'
import classNames from 'classnames'
import ImgCanvas from './imgCanvas'
import styles from './promotion.less'

import img1 from '../../../assets/user.png'

function AgencyPromotion ({ promotion }) {
  if (!promotion.avatar) {
    promotion.avatar = img1
  }

  const imgProps = {
    userName: promotion.name,
    userImg: promotion.avatar,
    urlCode: promotion.url,
    agencyLabel: true,
  }

  return (
    <Row>
      <Col xs={24} lg={12}>
        <Row>
          <Col>
            {
              promotion.name && promotion.avatar ?
              <div>
                <p className={styles.inputp}>方式1：邀请客户点击组织专属推广链接进行注册</p>
                <p className={styles.inputp}><Input defaultValue={promotion.url} readOnly /></p>
                <p className={classNames(styles.btn, styles.inputp)}>
                  <CopyToClipboard text={promotion.url}>
                    <Button type="primary">复制链接</Button>
                  </CopyToClipboard>
                </p>
                <p className={styles.inputp}>方式2：邀请客户扫描机构推广二维码进行推广</p>
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
        <Col xs={24} lg={12} >
          {
            promotion.name && promotion.avatar ? <ImgCanvas {...imgProps} /> : ''
          }
        </Col>
      }
    </Row>
  )
}

AgencyPromotion.propTypes = {
  promotion: PropTypes.object,
}

export default AgencyPromotion

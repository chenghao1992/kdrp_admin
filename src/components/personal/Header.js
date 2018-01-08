import React, { PropTypes } from 'react'
import { Modal, Button, Badge, Row } from 'antd'
const confirm = Modal.confirm
import classNames from 'classnames'
import styles from '../common_list.less'
import { PERSONAL_STATUS } from '../../utils/enums'

const Header = ({ obj, buttonClick, optStatus }) => {
  function showConfirm (status) {
    confirm({
      title: `您确定要${PERSONAL_STATUS[status]}该账户吗?`,
      // content: 'some descriptions',
      onOk () {
        buttonClick.change_personal_status(status)
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  let buttons = ''
  // obj.status='disable'
  switch (obj.status) {
    case 'init':buttons =
      (<div className={classNames(styles.common_fr)}>
        <Badge status="default" text="待启用" className={classNames(styles.common_margin_r15)} />
      </div>)

      break
    case 'running':buttons =
      (<div className={classNames(styles.common_fr)}>
        <Badge status="success" text="正常" className={classNames(styles.common_margin_r15)} />
        <Button type="primary" size="default" onClick={() => showConfirm('freezing')} className={classNames(styles.common_margin_r10)}>冻结</Button>
        <Button type="danger" size="default" onClick={() => showConfirm('disable')}>销户</Button>
      </div>)
      break
    case 'freezing':buttons =
      (<div className={classNames(styles.common_fr)}>
        <Badge status="processing" text="冻结" className={classNames(styles.common_margin_r15)} />
        <Button type="primary" size="default" onClick={() => showConfirm('running')} className={classNames(styles.common_margin_r10)}>解冻</Button>
        <Button type="danger" size="default" onClick={() => showConfirm('disable')}>销户</Button>
      </div>)
      break
    case 'disable':buttons =
      (<div className={classNames(styles.common_fr)}>
        <Badge status="error" text="已销户" />
      </div>)
      break
    default :
  }

  return (
    <div >
      <Row className={classNames(styles.common_margin_b10, styles.common_clear_float)}>
        <h1 className={classNames(styles.common_header_h1, styles.common_fl)}>{obj.name}</h1>
        <div className={classNames({ isHide: !optStatus })}>
          {buttons}
        </div>
      </Row>
    </div>
  )
}

Header.propTypes = {
  obj: PropTypes.object,
  buttonClick: PropTypes.object,
  optStatus: PropTypes.bool,
}

export default Header

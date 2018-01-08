import React, { PropTypes } from 'react'
import { Button, Badge, Row, Modal } from 'antd'
const confirm = Modal.confirm
import styles from '../common_list.less'
import classNames from 'classnames'


function StatusAction ({ fullname, status, handleEnable, handleFreeze, handleDisable, handleUnfreeze }) {
  const STAFFLIST_STATUS_ALL = {
    init: '启用',
    running: '解冻',
    freezing: '冻结',
    disable: '注销',
  }
  function showConfirm (myStatus) {
    confirm({
      title: `您确定要${STAFFLIST_STATUS_ALL[myStatus]}该${myStatus === 'init' ? '机构' : '公司'}吗?`,
      onOk () {
        switch (myStatus) {
          case 'init':handleEnable(); break
          case 'running':handleUnfreeze(); break
          case 'freezing':handleFreeze(); break
          case 'disable':handleDisable(); break
          default :
        }
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  let sa
  switch (status) {
    case 'init':
      sa = (<div className={classNames(styles.common_fr)}>
        <Badge status="default" text="待启用" className={classNames(styles.common_margin_r15)} />
        <Button type="primary" size="default" onClick={() => showConfirm('init')}>启用</Button>
      </div>)

      break
    case 'running':
      sa = (<div className={classNames(styles.common_fr)}>
        <Badge status="success" text="正常" className={classNames(styles.common_margin_r15)} />
        <Button type="primary" size="default" onClick={() => showConfirm('freezing')} className={classNames(styles.common_margin_r10)}>冻结</Button>
        <Button type="danger" size="default" onClick={() => showConfirm('disable')}>销户</Button>
      </div>)
      break
    case 'freezing':
      sa = (<div className={classNames(styles.common_fr)}>
        <Badge status="processing" text="冻结" className={classNames(styles.common_margin_r15)} />
        <Button type="primary" size="default" onClick={() => showConfirm('running')} className={classNames(styles.common_margin_r10)}>解冻</Button>
        <Button type="danger" size="default" onClick={() => showConfirm('disable')}>销户</Button>
      </div>)
      break
    case 'disable':
      sa = (<div className={classNames(styles.common_fr)}>
        <Badge status="error" text="已销户" />
      </div>)
      break
    default:
      sa = ''
      break
  }

  return (
    <div >
      <Row className={classNames(styles.common_margin_b10, styles.common_clear_float)}>
        <h1 className={classNames(styles.common_header_h1, styles.common_fl)}>{fullname}</h1>
        {sa}
      </Row>

    </div>
  )
}
StatusAction.propTypes = {
  fullname: PropTypes.string,
  status: PropTypes.string,
  handleEnable: PropTypes.func,
  handleFreeze: PropTypes.func,
  handleDisable: PropTypes.func,
  handleUnfreeze: PropTypes.func,
}

export default StatusAction

import React, { PropTypes } from 'react'
import { Button, Row } from 'antd'
import styles from '../common_list.less'

function ActionButton ({ roles, selectedRowKeys, handleDistribute, handleRecovery, handleRedistribute, handleUpload }) {
  const hasSelected = selectedRowKeys.length > 0
  const isChannelMnger = roles.some((value) => {
    return value.key === 'channel_leader' && value.is_active
  })
  return (
    <div >
      <Row className={styles.common_button}>
        <Button type="primary" onClick={handleDistribute} className={styles.common_button_1}
          disabled={!hasSelected}
        >批量分配</Button>
        <Button type="primary" onClick={handleRecovery} className={styles.common_button_2}
          disabled={!hasSelected}
        >批量回收</Button>
        <Button type="primary" onClick={handleRedistribute} className={styles.common_button_2}>按员工分配客户</Button>
        {isChannelMnger ?
          <Button type="primary" onClick={handleUpload} className={styles.common_button_2}>导入客户</Button> : null}
      </Row>
    </div>
  )
}
ActionButton.propTypes = {
  roles: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  handleDistribute: PropTypes.func,
  handleRecovery: PropTypes.func,
  handleRedistribute: PropTypes.func,
  handleUpload: PropTypes.func,
}

export default ActionButton

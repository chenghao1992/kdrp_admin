import React, { PropTypes } from 'react'
import { Button, Row } from 'antd'
import styles from '../common_list.less'

function ActionButton ({ selectedRowKeys, handleCommit }) {
  const hasSelected = selectedRowKeys.length > 0

  return (
    <div>
      <Row className={styles.common_button}>
        <Button type="primary" onClick={handleCommit}
          disabled={!hasSelected}
        >批量上交</Button>
      </Row>
    </div>
  )
}
ActionButton.propTypes = {
  selectedRowKeys: PropTypes.array,
  handleCommit: PropTypes.func,
}

export default ActionButton

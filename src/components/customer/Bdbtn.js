import React, { PropTypes } from 'react'
import { Button, Row } from 'antd'
import styles from '../common_list.less'

function BdButton ({ selectedRowKeys, handleToBd }) {
  const hasSelected = selectedRowKeys.length > 0
  return (
    <div >
      <Row className={styles.common_button}>
        <Button type="primary" onClick={handleToBd} className={styles.common_button_1}
          disabled={!hasSelected}
        >批量分配</Button>
      </Row>
    </div>
  )
}
BdButton.propTypes = {
  selectedRowKeys: PropTypes.array,
  handleToBd: PropTypes.func,
}

export default BdButton

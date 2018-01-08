import React from 'react'
import { Button, Row } from 'antd'
import { Link } from 'dva/router'
import styles from '../common_list.less'

function AddButton () {
  return (
    <div>
      <Row className={styles.common_button}>
        <Link to="/channel/partnerAdd">
          <Button type="primary" icon="plus">新建机构</Button>
        </Link>
      </Row>
    </div>
  )
}

export default AddButton

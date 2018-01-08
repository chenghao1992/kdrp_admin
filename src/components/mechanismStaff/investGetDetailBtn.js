import React, { PropTypes } from 'react'
import { Form, Button, Row } from 'antd'
import styles from '../common_list.less'

function GetDetail ({ handleClick }) {
  return (
    <Row className={styles.common_button}>
        <Button onClick={handleClick}>导出明细</Button>
    </Row>
  )
}

GetDetail.propTypes = {
  handleClick: PropTypes.func,
}

export default Form.create()(GetDetail)

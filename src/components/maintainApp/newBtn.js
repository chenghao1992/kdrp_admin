/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import styles from '../common_list.less'

function NewBtn ({ onAdd, btnText }) {
  return (
    <Row className={styles.common_button}>
      <Col>
        <Button className={styles.common_button_3} type="primary" onClick={onAdd}>{btnText}</Button>
      </Col>
    </Row>
  )
}

NewBtn.propTypes = {
  onAdd: PropTypes.func,
  btnText: PropTypes.string,
}

export default Form.create()(NewBtn)


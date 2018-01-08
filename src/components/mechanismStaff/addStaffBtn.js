import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import styles from '../common_list.less'

function AddMechanStaff ({ handleUpload, handleAddStaff }) {
  return (
    <div>
      <Row className={styles.common_button}>
        <Button className={styles.common_button_1} onClick={handleUpload}>批量导入</Button>
        <Col>
          <Button className={styles.common_button_3} onClick={handleAddStaff} type="primary" icon="plus" >新增</Button>
        </Col>
      </Row>
    </div>
  )
}

AddMechanStaff.propTypes = {
  handleUpload: PropTypes.func,
  handleAddStaff: PropTypes.func,
}

export default Form.create()(AddMechanStaff)

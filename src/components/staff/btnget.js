import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import styles from '../common_list.less'
// import { Link } from 'dva/router'
// import styles from './btnget.css'

function Btnget ({ onAdd }) {
  return (
    <Row className={styles.common_button}>
      {/* <Upload className={styles.common_button_1}>
        <Button >
          <Icon type="upload" /> 批量导入
        </Button>
      </Upload >*/}
      <Col>
      {/* <p className={styles.common_button_2}>下载导入模块</p>*/}
      <Button className={styles.common_button_3} type="primary" icon="plus" onClick={onAdd}>新增员工</Button>
      </Col>
    </Row>
  )
}

Btnget.propTypes = {
  onAdd: PropTypes.func,
}

export default Form.create()(Btnget)

import React from 'react'
import { Icon } from 'antd'
import styles from './error.less'

const Error = () => <div className="content-inner">
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>403 Forbidden</h1>
  </div>
</div>

export default Error

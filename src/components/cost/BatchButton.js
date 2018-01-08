import React, { PropTypes } from 'react'
import { Button, Popconfirm } from 'antd'
import styles from './BatchButton.css'

function BatchButton ({ onBatch, title, text }) {
  return (
    <div className={styles.normal}>
      <Popconfirm title={title} onConfirm={() => onBatch()}>
        <Button type="primary" icon="exception">{text}</Button>
      </Popconfirm>
    </div>
  )
}
BatchButton.propTypes = {
  onBatch: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}

export default BatchButton

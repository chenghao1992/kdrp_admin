import React, { PropTypes } from 'react'
import { Alert } from 'antd'
import styles from './TopMsg.css'

function TopMsg ({ freezeMsg }) {
  return (
    <div className={styles.normal}>
      {freezeMsg &&
      <Alert message={freezeMsg}
        type="info"
        showIcon
        closable
      />
      }

    </div>
  )
}

TopMsg.propTypes = {
  freezeMsg: PropTypes.string,
}

export default TopMsg

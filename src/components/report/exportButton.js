import React, { PropTypes } from 'react'
import { Button } from 'antd'
import styles from './exportButton.css'
// import { Link } from 'dva/router'

function ExportButton ({ onExport }) {
  return (
    <div className={styles.normal} style={{ marginBottom: 20 }}>
        <Button icon="export" onClick={onExport}>导出明细</Button>
    </div>
  )
}

ExportButton.propTypes = {
  onExport: PropTypes.func,
}

export default ExportButton

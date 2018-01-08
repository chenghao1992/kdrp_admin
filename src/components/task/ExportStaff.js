import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './List.css'
// import { Link } from 'dva/router'
// import { COMPANY_STATUS } from '../../utils/enums'
// import moment from 'moment'

function ExportStaff ({ dataSource, columns }) {
  return (
    <div className={styles.normal}>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  )
}

ExportStaff.propTypes = {

  dataSource: PropTypes.array,

  columns: PropTypes.array,
}

export default ExportStaff


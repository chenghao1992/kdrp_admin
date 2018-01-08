import React, { PropTypes } from 'react'
import { Table } from 'antd'
// import { Link } from 'dva/router'
// import { COMPANY_STATUS } from '../../utils/enums'
// import moment from 'moment'


import styles from './List.css'

function ErrorList ({ loading, dataSource, pagination, onTableChange, columns }) {
  return (
    <div className={styles.normal}>
      <Table
        bordered
        onChange={onTableChange}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 20, ...pagination }}
        simple
      />
    </div>
  )
}

ErrorList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  columns: PropTypes.array,
}

export default ErrorList

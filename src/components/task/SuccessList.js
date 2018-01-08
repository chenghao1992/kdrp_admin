import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './List.css'
// import { Link } from 'dva/router'
// import { COMPANY_STATUS } from '../../utils/enums'
// import moment from 'moment'

function SuccessList ({ loading, dataSource, pagination, onTableChange, columns }) {
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

SuccessList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  columns: PropTypes.array,
}

export default SuccessList

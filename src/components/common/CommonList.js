

/**
 * Created by xiaoys on 2017/10/26.
 */
import React, { PropTypes } from 'react'
import { Table } from 'antd'

function CommonList ({
  size,
  columns,
  rowSelection,
  commonLists,
  loading,
  onPageChange,
  pagination,
  rowKeys,
}) {
  return (
    <div>
      <Table
        size={size || 'default'}
        bordered
        rowSelection={rowSelection}
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={commonLists}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record[rowKeys]}
      />
    </div>
  )
}

CommonList.propTypes = {
  columns: PropTypes.array,
  rowSelection: PropTypes.object,
  commonLists: PropTypes.array,
  loading: PropTypes.bool,
  onPageChange: PropTypes.func,
  pagination: PropTypes.object,
  rowKeys: PropTypes.string,
  customerListBd: PropTypes.object,
  size: PropTypes.string,
}

export default CommonList

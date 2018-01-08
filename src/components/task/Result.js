import React, { PropTypes } from 'react'
import styles from './Result.css'
import SuccessList from './SuccessList'
import ErrorList from './ErrorList'
import ExportStaff from './ExportStaff'
import { Card, Tabs, Button } from 'antd'

const TabPane = Tabs.TabPane

function Result ({
  details,
  getExportTables,
  isExportStaff,
  extend_fields,
  fail_records,
  success_records,
  fail_pagination,
  success_pagination,
  loading,
  onSuccessTableChange,
  onFailTableChange,
}) {
  let successColumns = [{
    title: '文件名称',
    dataIndex: 'file_name',
    key: 'file_name',
  }, {
    title: '对应行号',
    dataIndex: 'row_index',
    key: 'row_index',
  }, {
    title: '状态',
    dataIndex: 'reason',
    key: 'reason',
  }]

  let failColumns = [{
    title: '文件名称',
    dataIndex: 'file_name',
    key: 'file_name',
  }, {
    title: '对应行号',
    dataIndex: 'row_index',
    key: 'row_index',
  }, {
    title: '失败原因',
    dataIndex: 'reason',
    key: 'reason',
  }]

  let exportStaff = [{
    title: '查询日期',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '组织',
    dataIndex: 'value',
    key: 'value',
  }]


  function handleColumns (columns) {
    columns.splice(2, 0, ...extend_fields.map((v) => {
      v.dataIndex = v.key
      return v
    }))
  }

  handleColumns(successColumns)
  handleColumns(failColumns)


  const errorListProps = {
    extend_fields,
    dataSource: fail_records,
    columns: failColumns,
    loading,
    pagination: fail_pagination,
    onTableChange: onFailTableChange,
  }

  const successListProps = {
    extend_fields,
    dataSource: success_records,
    columns: successColumns,
    loading,
    pagination: success_pagination,
    onTableChange: onSuccessTableChange,
  }

  const exportStaffProps = {
    columns: exportStaff,
    dataSource: getExportTables,
  }

  return (
    <div className={styles.normal}>
      <Card title={!isExportStaff ? '导入结果' : '导出结果'} bordered={false}>
        {
          isExportStaff ?
          <div>
            {
              details.status === '成功' ?
                <Button type="primary">
                  <a href={details.file_url}>点击下载本次导出任务</a>
                </Button> : ''
            }
            <Tabs>
              <TabPane tab="导出条件">
                <ExportStaff {...exportStaffProps} />
              </TabPane>
            </Tabs>
          </div> :

          <Tabs defaultActiveKey="1" >
            <TabPane tab="失败记录" key="1">
              <ErrorList {...errorListProps} />
            </TabPane>
            <TabPane tab="成功记录" key="2">
              <SuccessList {...successListProps} />
            </TabPane>
          </Tabs>
        }
      </Card>
    </div>
  )
}

Result.propTypes = {
  extend_fields: PropTypes.array,
  fail_records: PropTypes.array,
  success_records: PropTypes.array,
  fail_pagination: PropTypes.object,
  success_pagination: PropTypes.object,
  loading: PropTypes.bool,
  onSuccessTableChange: PropTypes.func,
  onFailTableChange: PropTypes.func,
  details: PropTypes.object,
  getExportTables: PropTypes.array,
  isExportStaff: PropTypes.bool,
}

export default Result

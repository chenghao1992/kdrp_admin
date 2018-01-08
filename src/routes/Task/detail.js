import React, { PropTypes } from 'react'
import { connect } from 'dva'
import TaskInfo from '../../components/task/Info'
import TaskResult from '../../components/task/Result'


function TaskDetail ({ dispatch, taskDetail }) {
  const {
    details, extend_fields, fail_records, success_records, fail_pagination, success_pagination, isExportStaff, getExportTable,
  } = taskDetail

  let getExportTables = getExportTable.length > 0 ? [{ name: getExportTable[0].value, value: getExportTable[1].value }] : []

  const taskInfoProps = {
    details,
  }

  const taskResultProps = {
    details,
    getExportTables,
    isExportStaff,
    extend_fields,
    fail_records,
    success_records,
    success_pagination,
    fail_pagination,
    onSuccessTableChange (pagination) {
      dispatch({
        type: 'taskDetail/querySuccessList',
        payload: {
          page: pagination.current,
          page_size: pagination.pageSize,
        },
      })
    },
    onFailTableChange (pagination) {
      dispatch({
        type: 'taskDetail/queryFailList',
        payload: {
          page: pagination.current,
          page_size: pagination.pageSize,
        },
      })
    },
  }

  return (
    <div className="">
      <TaskInfo {...taskInfoProps} />
      <TaskResult {...taskResultProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    taskDetail: state.taskDetail,
    app: state.app,
    loading: state.loading.models.taskDetail,
  }
}

TaskDetail.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  taskDetail: PropTypes.object,
  loading: PropTypes.bool,
  app: PropTypes.object,
}


export default connect(mapStateToProps)(TaskDetail)

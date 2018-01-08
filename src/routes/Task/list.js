import React, { PropTypes } from 'react'
import { connect } from 'dva'
import TaskSearch from '../../components/task/Search'
import TaskList from '../../components/task/List'
import styles from '../../components/common_list.less'


function Task ({ dispatch, taskList, loading }) {
  const {
    list, pagination,
  } = taskList

  const taskSearchProps = {
    query () {
      dispatch({
        type: 'taskList/query',
      })
    },
    onSearch (data) {
      dispatch({
        type: 'taskList/search',
        payload: {
          name: data.name,
          create_time: data.create_time,
          page: 1,
          page_size: pagination.pageSize,
        },
      })
    },
  }


  const taskListProps = {
    loading,
    dataSource: list,
    pagination,
    onTableChange (pagination) {
      dispatch({
        type: 'taskList/query',
        payload: {
          page: pagination.current,
          page_size: pagination.pageSize,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>我的任务</h1>
      <TaskSearch {...taskSearchProps} />
      <TaskList {...taskListProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    taskList: state.taskList,
    app: state.app,
    loading: state.loading.models.taskList,
  }
}

Task.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  taskList: PropTypes.object,
  loading: PropTypes.bool,
  app: PropTypes.object,
}

export default connect(mapStateToProps)(Task)

import React, { PropTypes } from 'react'
import { connect } from 'dva'

import NewBtn from '../../components/maintainApp/newBtn'
import ConsultationColumnList from '../../components/maintainApp/consultationColumnList'
import Addmodal from '../../components/maintainApp/addColumn'

import styles from '../../components/common_list.less'

function ConsultationColumn ({ dispatch, consultationColumn }) {
  const { addVisible, type, list, motalItem, queryParam, pagination, loading } = consultationColumn

  const newProps = {
    btnText: '新建栏目',
    onAdd () {
      console.log(1)
      dispatch({
        type: 'consultationColumn/addVisible',
        payload: true,
      })
      dispatch({
        type: 'consultationColumn/changeStatus',
        payload: 'create',
      })
    },
  }

  const listProps = {
    loading,
    dataSource: list,
    pagination,
    onDelete (params) {
      dispatch({
        type: 'consultationColumn/onDelete',
        payload: params,
      })
    },
    onEdit (params) {
      dispatch({
        type: 'consultationColumn/onEdit',
        payload: params,
      })
      dispatch({
        type: 'consultationColumn/changeStatus',
        payload: 'edit',
      })
    },
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'consultationColumn/columnList', payload: data })
    },
  }

  const addMapProps = {
    type,
    addVisible,
    item: type === 'create' ? {} : motalItem,
    onOk (params, reset) {
      dispatch({
        type: `consultationColumn/${type}`,
        payload: {
          datas: params,
          reset,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'consultationColumn/addVisible',
        payload: false,
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>栏目管理</h1>
      <p className={styles.common_header_p}>在这里维护APP的顶端栏目。请至少保留一个栏目。为保证前端体验，建议显示状态的最大数量不要超过10个。</p>
      <NewBtn {...newProps} />
      <ConsultationColumnList {...listProps} />
      <Addmodal {...addMapProps} />
    </div>

  )
}

ConsultationColumn.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  consultationColumn: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ consultationColumn }) => ({ consultationColumn }))(ConsultationColumn)

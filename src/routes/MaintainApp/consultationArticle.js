/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { hashHistory } from 'dva/router'

import NewBtn from '../../components/maintainApp/newBtn'
import ConsultationArticleList from '../../components/maintainApp/consultationArticleList'

import styles from '../../components/common_list.less'

function ConsultationArticle ({ dispatch, consultationArticle }) {
  const { list, queryParam, pagination, loading } = consultationArticle

  const newProps = {
    btnText: '新建文章',
    onAdd () {
      dispatch({
        type: 'consultationArticleDetail/changeFileList',
      })
      hashHistory.push('/maintainApp/addArticle')
    },
  }

  const consultationArticleListProps = {
    loading,
    dataSource: list,
    pagination,
    onDelete (params) {
      dispatch({
        type: 'consultationArticle/onDelete',
        payload: params,
      })
    },
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'consultationArticle/articlesList', payload: data })
    },
    handleClick (params) {
      dispatch({
        type: 'consultationArticle/gotoDetail',
        payload: params,
      })
    },
  }

  console.log(list)

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>文章管理</h1>
      <p className={styles.common_header_p}>在这里维护APP的文章。</p>
      <NewBtn {...newProps} />
      <ConsultationArticleList {...consultationArticleListProps} />
    </div>

  )
}

ConsultationArticle.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  consultationArticle: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ consultationArticle }) => ({ consultationArticle }))(ConsultationArticle)

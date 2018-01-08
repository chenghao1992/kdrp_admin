/**
 * Created by xiaoys on 2017/9/15.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'

import styles from '../../components/common_list.less'
import ShowContent from '../../components/maintainApp/showContent'

function ShowArticle ({ showArticle }) {
  const { getDetailList, codes } = showArticle

  const ShowContentProps = {
    getDetailList,
    codes,
  }
  console.log(getDetailList)

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>文章预览</h1>
      {getDetailList.title ? <ShowContent {...ShowContentProps} /> : ''}
    </div>
  )
}

ShowArticle.propTypes = {
  showArticle: PropTypes.object,
}

export default connect(({ showArticle }) => ({ showArticle }))(ShowArticle)

/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { Button } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'

import CommonProblemsShow from '../../components/maintainApp/commonProblemsShow'

import styles from '../../components/common_list.less'

function CommonProblem ({ commonProblem }) {
  const { saveProblem, changeContents } = commonProblem

  const commonProblemsShowProps = {
    saveProblem,
    changeContents,
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>常见问题维护</h1>
      {
        changeContents ?
          <div>
            {saveProblem.content ? <CommonProblemsShow {...commonProblemsShowProps} /> : ''}
          </div> : ''
      }
      <div className={styles.common_fr}>
        <Button type="primary"><Link to={{ pathname: '/maintainApp/commonProblemAdd' }}>编辑</Link></Button>
      </div>
    </div>
  )
}

CommonProblem.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  commonProblem: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ commonProblem }) => ({ commonProblem }))(CommonProblem)

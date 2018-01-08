/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CommonProblemsShowAdd from '../../components/maintainApp/commonProblemsShowAdd'
import { hashHistory } from 'dva/router'
import styles from '../../components/common_list.less'


function CommonProblemAdd ({ dispatch, commonProblemEdit, location }) {
  const { getProblems, saveProblem, changeContents } = commonProblemEdit

  console.log(commonProblemEdit)

  const commonProblemsShowAddProps = {
    saveProblem,
    getProblems,
    location,
    onCannel () {
      hashHistory.push('/maintainApp/commonProblem')
    },
    onChange (params) {
      dispatch({
        type: 'commonProblemEdit/getProblem',
        payload: params,
      })
    },
    handleOk () {
      const getIt = getProblems || saveProblem.content
      dispatch({
        type: 'commonProblemEdit/save',
        payload: {
          content: getIt,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>编辑常见问题</h1>
      {
        changeContents ?
          <div>
            {saveProblem.content ? <CommonProblemsShowAdd {...commonProblemsShowAddProps} /> : ''}
          </div> :
          <CommonProblemsShowAdd {...commonProblemsShowAddProps} />
      }
    </div>

  )
}

CommonProblemAdd.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  commonProblemEdit: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ commonProblemEdit }) => ({ commonProblemEdit }))(CommonProblemAdd)

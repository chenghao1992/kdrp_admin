/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'

import AddArticleEdit from '../../components/maintainApp/addArticle'

import styles from '../../components/common_list.less'

function AddArticle ({ dispatch, consultationArticleDetail }) {
  const { fileList, imageUrl, changeEidts, articleDetails, codeList, uploadSpan, type } = consultationArticleDetail

  console.log(articleDetails)

  const addArticleEditProps = {
    fileList,
    imageUrl,
    changeEidts,
    articleDetails: type === 'create' ? {} : articleDetails,
    codeList,
    uploadSpan,
    setFileListNum (param) {
      dispatch({
        type: 'consultationArticleDetail/setFileListNum',
        payload: param,
      })
    },
    changeImage (param) {
      dispatch({
        type: 'consultationArticleDetail/changeImage',
        payload: param,
      })
    },
    onChange (param) {
      console.log(param)
      dispatch({
        type: 'consultationArticleDetail/changeEidt',
        payload: param,
      })
    },
    onSubmit (param, reset) {
      dispatch({
        type: `consultationArticleDetail/${type}`,
        payload: {
          data: param,
          reset,
        },
      })
    },
    spanStatus (params) {
      dispatch({
        type: 'consultationArticleDetail/spanStatus',
        payload: params,
      })
    },
  }


  return (
    <div className="content-inner">
      {type ? <h1 className={styles.common_header_h1}>{type === 'create' ? '新建文章' : '修改文章'}</h1> : ''}
      <p className={styles.common_header_p}>新建的文章会在APP的对应栏目显示。</p>
      {
        type === 'create' ?
          <div>
            {codeList.length ? <AddArticleEdit {...addArticleEditProps} /> : ''}
          </div>
          :
          <div>
            {codeList.length && articleDetails.content ? <AddArticleEdit {...addArticleEditProps} /> : ''}
          </div>
      }
    </div>
  )
}

AddArticle.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  consultationArticleDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ consultationArticleDetail }) => ({ consultationArticleDetail }))(AddArticle)

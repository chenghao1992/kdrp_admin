/**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'

import NewBtn from '../../components/maintainApp/newBtn'
import AdvertisingMapList from '../../components/maintainApp/advertisingMapList'
import Addmodal from '../../components/maintainApp/addMap'

import styles from '../../components/common_list.less'

function AdvertisingMap ({ dispatch, advertisingMap }) {
  const { addVisible, type, fileList, imgUrl, listMaps, item, queryParam, pagination, loading } = advertisingMap

  const newProps = {
    btnText: '新建广告图',
    onAdd () {
      console.log(1)
      dispatch({
        type: 'advertisingMap/addVisible',
        payload: true,
      })
      dispatch({
        type: 'advertisingMap/changeStatus',
        payload: 'create',
      })
    },
  }

  const addMapProps = {
    item: type === 'create' ? {} : item,
    fileList,
    type,
    addVisible,
    imgUrl,
    onOk (params, reset) {
      dispatch({
        type: `advertisingMap/${type}`,
        payload: {
          data: params,
          reset,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'advertisingMap/addVisible',
        payload: false,
      })
    },
    setFileListNum (params) {
      dispatch({
        type: 'advertisingMap/setFileListNum',
        payload: params,
      })
    },
    changeImages (params) {
      dispatch({
        type: 'advertisingMap/imgUrls',
        payload: params,
      })
    },
  }

  const advertisingMapListProps = {
    loading,
    pagination,
    dataSource: listMaps,
    onEdit (params) {
      const fileItem = [
        {
          uid: -1,
          name: params.image_url,
          status: 'done',
          url: params.image_url,
        },
      ]
      console.log(fileItem)
      dispatch({
        type: 'advertisingMap/onEdit',
        payload: {
          data: params,
          fileItem,
        },
      })
    },
    onDelete (params) {
      dispatch({
        type: 'advertisingMap/onDelete',
        payload: params,
      })
    },
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'advertisingMap/mapList', payload: data })
    },
  }


  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>首页广告图维护</h1>
      <p className={styles.common_header_p}>在这里更换APP首页的轮播Banner。注意至少要保证有1个Banner是启用状态，建议启用状态的Banner在4个以下。系统后台控制最多支持10个Banner展示。</p>
      <NewBtn {...newProps} />
      <AdvertisingMapList {...advertisingMapListProps} />
      <Addmodal {...addMapProps} />
    </div>

  )
}

AdvertisingMap.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  advertisingMap: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ advertisingMap }) => ({ advertisingMap }))(AdvertisingMap)

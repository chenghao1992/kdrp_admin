import React, { PropTypes } from 'react'
import { connect } from 'dva'

import styles from '../../components/common_list.less'
import Search from '../../components/common/CommonSearch'
import AddMechanStaff from '../../components/mechanismStaff/addStaffBtn'
import MechanStaffList from '../../components/mechanismStaff/staffList'
import UploadStaff from '../../components/mechanismStaff/uploadStaff'
import AddStaffModal from '../../components/mechanismStaff/addStaffModal'

import { findPathInTree } from '../../utils/index'
import { STAFF_SEARCH, grid2 } from '../../components/mechanismStaff/SearchEnums'

function MechanismStaffMaintain ({ dispatch, mechanismStaffMaintain }) {
  const { data, loading, onHandleStatus, modalType, currentItem, queryParam, fileList, uploadModalVisible, addStaffModalVisible, orgTree, list, pagination } = mechanismStaffMaintain

  const searchProps = {
    code: STAFF_SEARCH,
    grid: grid2,
    CascaderList: orgTree,
    onSearch (data) {
      let param = data
      param.agency_id = param.agency_id ? param.agency_id[param.agency_id.length - 1] : ''
      param.page = 1
      param.page_size = pagination.pageSize
      dispatch({
        type: 'mechanismStaffMaintain/onSearch',
        payload: param,
      })
    },
  }

  const addMechanStaffProps = {
    handleUpload () {
      console.log('上传')
      dispatch({
        type: 'mechanismStaffMaintain/changeModalStatus',
        payload: true,
      })
    },
    handleAddStaff () {
      dispatch({
        type: 'mechanismStaffMaintain/changeAddStaffStatusModal',
        payload: {
          addStaffModalVisible: !addStaffModalVisible,
          modalType: 'newCreat',
        },
      })
      dispatch({
        type: 'mechanismStaffMaintain/pushData',
        payload: [],
      })
    },
  }

  const mechanStaffListProps = {
    list,
    pagination,
    loading,
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'mechanismStaffMaintain/onSearch', payload: data })
    },
    // 编辑
    onEditItem (item) {
      // item.agency_id = findPathInTree(item.agency_id, orgTree, 'value')
      item.agency_idD = findPathInTree(item.agency_id, orgTree, 'value')
      dispatch({
        type: 'mechanismStaffMaintain/showModal',
        payload: {
          addStaffModalVisible: !addStaffModalVisible,
          modalType: 'edit',
          currentItem: item,
        },
      })
    },
    // 删除
    onDelete (params) {
      dispatch({
        type: 'mechanismStaffMaintain/onDelete',
        payload: {
          id: params,
        },
      })
    },
  }

  const uploadStaffProps = {
    uploadModalVisible,
    fileList,
    onCancel () {
      dispatch({
        type: 'mechanismStaffMaintain/changeModalStatus',
        payload: false,
      })
    },
    setFileList (data) {
      dispatch({
        type: 'mechanismStaffMaintain/setFileList',
        payload: data,
      })
    },
    onOk (data) {
      dispatch({
        type: 'mechanismStaffMaintain/importStaff',
        payload: data,
      })
    },
  }

  const addStaffModalProps = {
    timer: false,
    item: modalType === 'newCreat' ? {} : currentItem,
    modalType,
    orgTree,
    addStaffModalVisible,
    data,
    onHandleStatus,
    onCancel () {
      dispatch({
        type: 'mechanismStaffMaintain/changeAddStaffStatusModal',
        payload: {
          addStaffModalVisible: !addStaffModalVisible,
        },
      })
    },
    handleAddOrEdit (params, resetFields) {
      params.datas.agency_id = params.datas.agency_id ? params.datas.agency_id[params.datas.agency_id.length - 1] : ''
      dispatch({
        type: 'mechanismStaffMaintain/handleAddOrEdit',
        payload: {
          data: params.datas,
          modalTypes: params.modalTypes,
          id: params.id,
          resetFields,
        },
      })
    },
    onHandleSearchs (params) {
      dispatch({
        type: 'mechanismStaffMaintain/onHandleSearch',
        payload: {
          content: params,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>机构职工维护</h1>
      <p className={styles.common_header_p}>在这个页面点击【新增用户】添加一位职工加入您的组织节点。加入节点后，该节点的管理员能看到这个职工的个人投资情况</p>
      <Search {...searchProps} />
      <AddMechanStaff {...addMechanStaffProps} />
      <MechanStaffList {...mechanStaffListProps} />
      <UploadStaff {...uploadStaffProps} />
      <AddStaffModal {...addStaffModalProps} />
    </div>
  )
}

MechanismStaffMaintain.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  mechanismStaffMaintain: PropTypes.object,
}

export default connect(({ mechanismStaffMaintain }) => ({ mechanismStaffMaintain }))(MechanismStaffMaintain)

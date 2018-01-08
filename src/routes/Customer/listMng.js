import React, { PropTypes } from 'react'
import { connect } from 'dva'


import CustomerList from '../../components/customer/List'
import CustomerSearch from '../../components/customer/Search'
import CustomerButton from '../../components/customer/ActionButton'
import DistributeModal from '../../components/customer/distributeModal'
import RecoveryModal from '../../components/customer/recoveryModal'
import RedistributeModal from '../../components/customer/redistributeModal'
import UploadModal from '../../components/customer/uploadModal'
import styles from '../../components/common_list.less'


// 根据角色渲染不同的table
function CustomerListMng ({ dispatch, customerListMng, selectSalesman, selectSalesmanAgc, loading, app }) {
  const {
    orgTree, list, pagination, query, selectedRowKeys, distributeModalVisible, recoveryModalVisible
    , redistributeModalVisible, expand, resetOrg, uploadModalVisible, fileList,
  } = customerListMng

  const selectSalesmanData = selectSalesman.data
  const { dataOrigin, dataReceiver } = selectSalesmanAgc

  const { roles } = app

  const customerSearchProps = {
    resetOrg,
    query () {
      dispatch({
        type: 'customerListMng/query',
      })
    },
    resetOrgTree () {
      dispatch({
        type: 'customerListMng/resetOrgTree',
      })
    },
    orgValue: query['agency.idList'],
    orgTree,
    onSearch (searchData) {
      dispatch({
        type: 'customerListMng/search',
        payload: {
          'agency.idList': searchData.agency.idList,
          'agency.code': searchData.agency.code,
          'agency.name': searchData.agency.name,
          'service.mobile': searchData.service.mobile,
          'service.name': searchData.service.name,
          'customer.service_status': searchData.customer.service_status,
          'customer.name': searchData.customer.name,
          'customer.mobile': searchData.customer.mobile,

          page: 1,
          page_size: pagination.pageSize,
        },
      })
    },
    expand,
    onToggle (isExpand) {
      dispatch({
        type: 'customerListMng/onToggle',
        payload: !isExpand,
      })
    },
  }

  const customerButtonsProps = {
    roles,
    loading,
    selectedRowKeys,
    handleDistribute () {
      console.log('批量分配')
      dispatch({
        type: 'customerListMng/batchDistribute',
      })
    },
    handleRecovery () {
      console.log('批量回收')
      dispatch({
        type: 'customerListMng/batchRecovery',
      })
    },
    handleRedistribute () {
      console.log('按员工重新分配')
      dispatch({
        type: 'customerListMng/redistribute',
      })
    },
    handleUpload () {
      console.log('上传')
      dispatch({
        type: 'customerListMng/upload',
      })
    },
  }

  const customerListProps = {
    selectedRowKeys,
    roles,
    loading,
    dataSource: list,
    pagination,
    onTableChange (page) {
      dispatch({
        type: 'customerListMng/query',
        payload: {
          page: page.current,
          page_size: page.pageSize,
        },
      })
    },
    onSelectedRowChange (selectedRowKeys) {
      dispatch({
        type: 'customerListMng/setSelectedRowKeys',
        payload: {
          selectedRowKeys,
        },
      })
    },
    onDistribute (id) {
      return function () {
        console.log(`分配:${id}`)
        dispatch({
          type: 'customerListMng/distribute',
          payload: {
            selectedRowKeys: [id],
          },
        })
      }
    },
    onRecovery (id) {
      return function () {
        console.log(`回收:${id}`)
        dispatch({
          type: 'customerListMng/recovery',
          payload: {
            selectedRowKeys: [id],
          },
        })
      }
    },
  }

  const handleChange = (value) => {
    dispatch({
      type: 'selectSalesman/query',
      payload: {
        value,
      },
    })
  }

  const handleChangeAgc = (queryData) => {
    dispatch({
      type: 'selectSalesmanAgc/query',
      payload: queryData,
    })
  }

  const distributeModalProps = {
    distributeModalVisible,
    selectedRowKeys,
    data: selectSalesmanData,
    handleChange,
    onOk (okData) {
      dispatch({
        type: 'customerListMng/distributeAsync',
        payload: okData,
      })
    },
    onCancel () {
      dispatch({
        type: 'customerListMng/distributeModelHide',
      })
    },
  }
  const uploadModalProps = {
    fileList,
    uploadModalVisible,
    onCancel () {
      dispatch({
        type: 'customerListMng/uploadModelHide',
      })
    },
    putFilenames (data) {
      dispatch({
        type: 'customerListMng/putFilenames',
        payload: data,
      })
    },
    setFileList (data) {
      dispatch({
        type: 'customerListMng/setFileList',
        payload: data,
      })
    },
    /* selectedRowKeys,
     data,
     handleChange,*/
    onOk (data) {
      dispatch({
        type: 'customerListMng/importCustomer',
        payload: data,
      })
    },
  }

  const recoveryModalProps = {
    recoveryModalVisible,
    orgTree,
    onOk (data) {
      dispatch({
        type: 'customerListMng/recoveryAsync',
        payload: {
          agency_id: data.agency_ids && data.agency_ids[data.agency_ids.length - 1],
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'customerListMng/recoveryModelHide',
      })
    },
  }

  const redistributeModalProps = {
    onOrgChange () {
      dispatch({
        type: 'selectSalesmanAgc/clearPerson',
      })
    },
    dataOrigin,
    dataReceiver,
    redistributeModalVisible,
    handleChangeAgc,
    orgTree,
    onOk (data) {
      dispatch({
        type: 'customerListMng/redistributeAsync',
        payload: {
          agency_id: data.agency_ids && data.agency_ids[data.agency_ids.length - 1],
          source_id: data.contentOrigin,
          receive_id: data.contentReceiver,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'customerListMng/redistributeModelHide',
      })
    },
  }


  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>客户管理</h1>
      <p className={styles.common_header_p}>
        在这个页面管理你最终的客户。您可以将客户重新分配给一个业务员或者一个组织的任务池。你还可以通过筛选条件查看没有配备兼职客服的客户。系统每5分钟同步客户数据一次。对于新绑定的客户，您将在5分钟内看到他的客户信息。</p>
      <CustomerSearch {...customerSearchProps} />
      <CustomerButton {...customerButtonsProps} />
      <CustomerList {...customerListProps} />

      <DistributeModal {...distributeModalProps} />
      <RecoveryModal {...recoveryModalProps} />
      <RedistributeModal {...redistributeModalProps} />
      <UploadModal {...uploadModalProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    customerListMng: state.customerListMng,
    selectSalesman: state.selectSalesman,
    selectSalesmanAgc: state.selectSalesmanAgc,
    app: state.app,
    loading: state.loading.models.customerListMng,
  }
}

CustomerListMng.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  customerListMng: PropTypes.object,
  selectSalesman: PropTypes.object,
  selectSalesmanAgc: PropTypes.object,
  loading: PropTypes.bool,
  app: PropTypes.object,
}

export default connect(mapStateToProps)(CustomerListMng)


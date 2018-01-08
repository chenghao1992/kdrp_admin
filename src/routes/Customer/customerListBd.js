/**
 * Created by xiaoys on 2017/11/8.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Select } from 'antd'

import Search from '../../components/common/CommonSearch'
import List from '../../components/common/CommonList'
import Modals from '../../components/customer/assortMotal'
import BdButton from '../../components/customer/Bdbtn'

import styles from '../../components/common_list.less'
import { grid2, CUSTOMER_BD_SEARCH } from '../../components/customer/SearchEnums'
import { CUSTOMER_BD_LIST } from '../../components/customer/ListEnums'
import { BOOLEAN_TWO } from '../../utils/enums'

const Option = Select.Option


function CustomerListBd ({ dispatch, customerListBd }) {
  const { selectedRowKeys, orgTree, list, visible, data, pagination, searchCodes, loading, errorP, radios } = customerListBd

  let listProps

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      listProps.onSelectedRowChange(selectRowKeys)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
    getCheckboxProps: record => ({
      disabled: record.is_assort,    // Column configuration not to be checked
    }),
  }

  const searchProps = {
    code: CUSTOMER_BD_SEARCH,
    grid: grid2,
    CascaderList: orgTree,
    SelectList: BOOLEAN_TWO.map((item) => <Option key={item.value} value={item.value}>{item.name}</Option>),
    onSearch (params) {
      params.agency.id = params.agency.id ? params.agency.id[params.agency.id.length - 1] : ''

      dispatch({
        type: 'customerListBd/onSearch',
        payload: {
          name: params.name,
          mobile: params.mobile,
          'agency.id': params.agency.id,
          'agency.code': params.agency.code,
          'service.mobile': params.service.mobile,
          'service.name': params.service.name,
          is_assort: params.is_assort,
          page: 1,
          page_size: 20,
        },
      })
    },
  }

  listProps = {
    commonLists: list,
    loading,
    pagination,
    selectedRowKeys,
    rowSelection,
    rowKeys: 'id',
    columns: CUSTOMER_BD_LIST.concat([{ title: '操作', dataIndex: 'id', key: 'id', render: (text, record) => <span>{!record.is_assort ? <a onClick={() => { listProps.handleClick(text) }}>分配</a> : ''}</span> }]),
    onSelectedRowChange (selectedRowKeys) {
      dispatch({
        type: 'customerListBd/setSelectedRowKeys',
        payload: selectedRowKeys,
      })
    },
    onPageChange (page) {
      let data = searchCodes
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'customerListBd/List', payload: data })
    },
    handleClick (params) {
      dispatch({
        type: 'customerListBd/changeMotal',
        payload: {
          modal: true,
          keys: params,
        },
      })
    },
  }

  const modalProps = {
    timer: false,
    orgTree,
    visible,
    data,
    errorP,
    radios,
    onCancel () {
      dispatch({
        type: 'customerListBd/changeMotal',
        payload: { modal: false },
      })
      dispatch({
        type: 'customerListBd/initData',
      })
    },
    onOk (params, reset) {
      dispatch({
        type: 'customerListBd/assorts',
        payload: {
          data: params,
          reset,
        },
      })
    },
    onErrorP (params) {
      dispatch({
        type: 'customerListBd/onErrorP',
        payload: params,
      })
    },
    onHandleSearchs (params) {
      dispatch({
        type: 'customerListBd/onHandleSearch',
        payload: {
          content: params,
        },
      })
    },
    handleChangeRadios (params) {
      dispatch({
        type: 'customerListBd/changeRadios',
        payload: { radios: params },
      })
    },
  }

  const bdbtnProps = {
    selectedRowKeys,
    handleToBd () {
      dispatch({
        type: 'customerListBd/changeMotal',
        payload: {
          modal: true,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>客户管理</h1>
      <p className={styles.common_header_p}>在这个页面对从CRM分配到兼职客服管理系统的客户进行分配操作。您可以将客户分配给一个兼职客服或者一个组织的客户池。</p>
      <Search {...searchProps} />
      <BdButton {...bdbtnProps} />
      <List {...listProps} />
      <Modals {...modalProps} />
    </div>
  )
}

CustomerListBd.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  customerListBd: PropTypes.object,
}

export default connect(({ customerListBd }) => ({ customerListBd }))(CustomerListBd)

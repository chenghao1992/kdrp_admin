/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import commonStyles from '../../components/common_list.less'
import styles from './cutserListCsDetail.less'
import classNames from 'classnames'
import { Tabs, Switch } from 'antd'
import { hashHistory, Link } from 'dva/router'

import CommonMotal from '../../components/common/CommonMotal'
import List from '../../components/common/CommonList'
import Lsit1 from '../../components/customer/oneTabs_list1'
import ThreeTabs from '../../components/customer/threeTabs'
import Btns from '../../components/common/CommonBtn'

import { NEW_HOUSE, NEW_CAR } from '../../components/customer/SearchEnums'

import { CUSTOMER_DETAIL_LIST2, CUSTOMER_DETAIL_LIST3, CUSTOMER_DETAIL_LIST4 } from '../../components/customer/ListEnums'

const TabPane = Tabs.TabPane

function CustomerListCsDetail ({ dispatch, location, customerListCsDetail }) {
  const { pagination, pagination1, visibleHouse, visibleCar, code, contactList1, houseList1, remarkType, contactLoading, remarkLoading, codeHouse, newOrEdit, carList1, codeCar, fileList, keys, isUploading, remarkList1 } = customerListCsDetail

  const commonFn = {
    onChangeIt (checked, id) {
      dispatch({
        type: 'customerListCsDetail/onOrOff',
        payload: { active: checked ? '1' : '0', customer_id: location.query.id, contact_id: id },
      })
    },
  }

  // 联系人操作较多 在使用公共组件时 不适合将clumns写入listEnums 故写在这里
  const contactClumns = [
    { title: '序号', dataIndex: 'number', key: 'number', render: (text, record, index) => <span>{index + 1}</span> },
    { title: '主号', dataIndex: 'active', key: 'active', render: (text, record) => <Switch onChange={(checked) => { commonFn.onChangeIt(checked, record.id) }} checkedChildren="开" unCheckedChildren="关" checked={text} /> },
    { title: '联系人姓名', dataIndex: 'name', key: 'name', render: (text) => <span>{text}</span> },
    { title: '生效验证', dataIndex: 'mobile_validate_status', key: 'mobile_validate_status', render: (text) => <span>{text}</span> },
    { title: '关系', dataIndex: 'relation_type', key: 'relation_type ', render: (text) => <span>{text}</span> },
    { title: '固话', dataIndex: 'phone', key: 'phone', render: (text) => <span>{text || '--'}</span> },
    { title: '手机号码', dataIndex: 'mobile', key: 'mobile', render: (text) => <span>{text || '--'}</span> },
    { title: '最后操作人', dataIndex: 'last_operation_username', key: 'last_operation_username', render: (text) => <span>{text || '--'}</span> },
    { title: '最后操作时间', dataIndex: 'update_time', key: 'update_time', render: (text) => <span>{text || '--'}</span> },
    { title: '操作', dataIndex: 'number1', key: 'number1', render: (text, record) => <span><Link to={{ pathname: '/customer/customerList_cs_new', query: { id: location.query.id, contactId: record.id, status: 3 } }}>查看</Link><Link to={{ pathname: '/customer/customerList_cs_new', query: { id: location.query.id, contactId: record.id, status: 2 } }} className={commonStyles.common_margin_l15}>编辑</Link></span> },
  ]

  const list1Props = {
    code,
  }

  const newContactBtn = {
    text: '新建联系人',
    type: 'primary',
    handleClicks () {
      hashHistory.push(`/customer/customerList_cs_new?id=${location.query.id}&status=1`)
    },
  }

  const ContactList = {
    size: 'small',
    commonLists: contactList1,
    loading: contactLoading,
    pagination,
    rowKeys: 'id',
    columns: contactClumns,
    onPageChange (page) {
      dispatch({
        type: 'customerListCsDetail/contactLists',
        payload: { page: page.current, page_size: 5, customer_id: location.query.id },
      })
    },
  }

  const newHouseBtn = {
    text: '新建房产',
    type: 'primary',
    handleClicks () {
      dispatch({
        type: 'customerListCsDetail/changeVisible',
        payload: { visibleHouse: true, newOrEdit: 1 },
      })
    },
  }

  const houseList = {
    size: 'small',
    commonLists: houseList1,
    loading: contactLoading,
    pagination,
    rowKeys: 'id',
    handleClick (record) {
      dispatch({
        type: 'customerListCsDetail/handleHouseEdit',
        payload: { codeHouse: record, newOrEdit: 2 },
      })
    },
    columns: CUSTOMER_DETAIL_LIST2.concat([{ title: '操作', key: 'id', dataIndex: 'id', render: (text, record) => <span><a onClick={() => { houseList.handleClick(record) }}>编辑</a></span> }]),
    onPageChange (page) {
      dispatch({
        type: 'customerListCsDetail/houseLists',
        payload: { page: page.current, page_size: 5, customer_id: location.query.id },
      })
    },
  }

  const newCarBtn = {
    text: '新建车辆',
    type: 'primary',
    handleClicks () {
      dispatch({
        type: 'customerListCsDetail/changeVisible',
        payload: { visibleCar: true, newOrEdit: 1 },
      })
    },
  }

  const carList = {
    size: 'small',
    commonLists: carList1,
    loading: contactLoading,
    pagination,
    rowKeys: 'id',
    handleClick (record) {
      dispatch({
        type: 'customerListCsDetail/handleCarEdit',
        payload: { codeCar: record, newOrEdit: 2 },
      })
    },
    columns: CUSTOMER_DETAIL_LIST3.concat([{ title: '操作', key: 'id', dataIndex: 'id', render: (text, record) => <span><a onClick={() => { carList.handleClick(record) }}>编辑</a></span> }]),
    onPageChange (page) {
      dispatch({
        type: 'customerListCsDetail/carLists',
        payload: { page: page.current, page_size: 5, customer_id: location.query.id },
      })
    },
  }

  const remarkList = {
    size: 'small',
    commonLists: remarkList1,
    loading: remarkLoading,
    pagination: pagination1,
    rowKeys: 'id',
    columns: CUSTOMER_DETAIL_LIST4,
    onPageChange (page) {
      dispatch({
        type: 'customerListCsDetail/remarkLists',
        payload: { page: page.current, page_size: 5, customer_id: location.query.id },
      })
    },
  }

  const commonMotalHouseProps = {
    title: newOrEdit === 1 ? '新建房产' : '编辑房产',
    visible: visibleHouse,
    code: codeHouse || {},
    list: NEW_HOUSE,
    handleOk (params, reset) {
      params.customer_id = location.query.id
      params.house_province = params.address ? params.address[0] : ''
      params.house_city = params.address ? params.address[1] : ''
      params.house_county = params.address ? params.address[2] : ''
      dispatch({
        type: `customerListCsDetail/${newOrEdit === 1 ? 'motalHouse' : 'editHouse'}`,
        payload: {
          data: params,
          reset,
        },
      })
    },
    handCancel () {
      dispatch({
        type: 'customerListCsDetail/changeVisible',
        payload: { visibleHouse: false, codeHouse: {} },
      })
    },
  }

  const commonMotalCarProps = {
    title: newOrEdit === 1 ? '新建车辆' : '编辑车辆',
    visible: visibleCar,
    code: codeCar || {},
    list: NEW_CAR,
    handleOk (params, reset) {
      params.customer_id = location.query.id
      params.car_province = params.address ? params.address[0] : ''
      params.car_city = params.address ? params.address[1] : ''
      params.car_county = params.address ? params.address[2] : ''
      dispatch({
        type: 'customerListCsDetail/motalCar',
        payload: {
          data: params,
          reset,
        },
      })
    },
    handCancel () {
      dispatch({
        type: 'customerListCsDetail/changeVisible',
        payload: { visibleCar: false, codeCar: {} },
      })
    },
  }


  const threeProps = {
    remarkType,
    fileList,
    keys,
    isUploading,
    setFileList (params) {
      dispatch({ type: 'customerListCsDetail/saveUpload', payload: { fileList: params } })
    },
    setIsUpLoading (params) {
      dispatch({ type: 'customerListCsDetail/saveUpload', payload: { isUploading: params } })
    },
    setKeys (params) {
      keys.push(params)
      dispatch({ type: 'customerListCsDetail/saveKeys', payload: keys })
    },
    deleteKeys (params) {
      dispatch({ type: 'customerListCsDetail/saveKeys', payload: params })
    },
    onHandle (params, reset) {
      params.customer_id = location.query.id
      dispatch({ type: 'customerListCsDetail/newRemarks', payload: { data: params, reset } })
    },
    deleteList () {
      dispatch({ type: 'customerListCsDetail/saveUpload', payload: { fileList: [], keys: [] } })
    },
  }

  const handleChange = (key) => {
    if (key === '1') {
      dispatch({ type: 'customerListCsDetail/contactLists', payload: { customer_id: location.query.id } })
    } else if (key === '2') {
      dispatch({ type: 'customerListCsDetail/houseLists', payload: { customer_id: location.query.id } })
    } else {
      dispatch({ type: 'customerListCsDetail/carLists', payload: { customer_id: location.query.id } })
    }
  }

  const handleChange2 = (key) => {
    if (key === '2') {
      dispatch({ type: 'customerListCsDetail/remarkLists', payload: { customer_id: location.query.id } })
    }
  }

  return (
    <div className="content-inner">
      <div className={commonStyles.customerDetail_container}>
        <h1 className={commonStyles.common_header_h1}>客户基本信息</h1>
        <Tabs type="card">
          <TabPane tab="基本信息" key="1"><div className={classNames(commonStyles.common_padding_l15)}><Lsit1 {...list1Props} /></div></TabPane>
        </Tabs>
        <h1 className={commonStyles.common_header_h1}>客户补充信息</h1>
        <Tabs type="card" onChange={(key) => { handleChange(key) }}>
          <TabPane tab="联系人" key="1"><div className={classNames(styles.content_1, styles.content_heights)}><div className={styles.btn_style}>
            <Btns {...newContactBtn} /></div><div className={styles.clear}></div><List {...ContactList} /></div>
          </TabPane>
          <TabPane tab="房产" key="2"><div className={classNames(styles.content_1, styles.content_heights)}><div className={styles.btn_style}>
            <Btns {...newHouseBtn} /></div><div className={styles.clear}></div><List {...houseList} /></div>
          </TabPane>
          <TabPane tab="车辆" key="3"><div className={classNames(styles.content_1, styles.content_heights)}><div className={styles.btn_style}>
            <Btns {...newCarBtn} /></div><div className={styles.clear}></div><List {...carList} /></div>
          </TabPane>
        </Tabs>
        <h1 className={commonStyles.common_header_h1}>备注信息</h1>
        <Tabs type="card" onChange={(key) => { handleChange2(key) }}>
          <TabPane tab="新增备注" key="1"><div className={classNames(styles.content_1, styles.content_height)}>
            <ThreeTabs {...threeProps} /></div>
          </TabPane>
          <TabPane tab="历史备注" key="2"><div className={classNames(styles.content_1, styles.content_height)}>
            <List {...remarkList} /></div>
          </TabPane>
        </Tabs>
        <CommonMotal {...commonMotalHouseProps} />
        <CommonMotal {...commonMotalCarProps} />
      </div>

    </div>
  )
}

CustomerListCsDetail.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  customerListCsDetail: PropTypes.object,
}

export default connect(({ customerListCsDetail }) => ({ customerListCsDetail }))(CustomerListCsDetail)

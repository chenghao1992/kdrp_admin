import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Select, Modal, Button } from 'antd'

import Search from '../../components/common/CommonSearch'
import List from '../../components/common/CommonList'
import Btnget from '../../components/staff/btnget'
import AddStaff from '../../components/staff/addStaff'
import { findPathInTree } from '../../utils/index'
import styles from '../../components/common_list.less'

import { STAFFLIST_STATUS } from '../../utils/enums'
import { STAFF_LIST } from '../../components/staff/ListEnums'
import { grid2, STAFF_SEARCH } from '../../components/staff/SearchEnums'

const Option = Select.Option
const confirm = Modal.confirm

function StaffList ({ dispatch, staffList }) {
  const { orgTree, queryParam, list, loading, pagination, currentItem, modalVisible, modalType, timeList } = staffList

  const searchPropsed = {
    code: STAFF_SEARCH,
    grid: grid2,
    CascaderList: orgTree,
    SelectList: STAFFLIST_STATUS.map((item, key) => <Option key={key} value={item.value}>{item.name}</Option>),
    onSearch (param) {
      const rangeTime = param.start_end_time
      let dates
      if (rangeTime !== undefined) {
        dates = rangeTime.length > 0 ? `${rangeTime[0].format('YYYY-MM-DD')}~${rangeTime[1].format('YYYY-MM-DD')}` : ''
      } else {
        dates = ''
      }
      param.start_end_time = dates
      param.agency_id = param.agency_id ? param.agency_id[param.agency_id.length - 1] : ''
      param.page = 1
      param.page_size = pagination.pageSize
      dispatch({ type: 'staffList/search', payload: param })
    },
  }

  const BtngetProps = {
    onAdd () {
      dispatch({
        type: 'staffList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  const AddstaffProps = {
    orgTree,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,

    onOk (data) {
      data.agency_id = data.agency_id ? data.agency_id[data.agency_id.length - 1] : ''
      // console.log(data)
      dispatch({
        type: `staffList/${modalType}`,
        payload: data,
      })
    },

    onCancel () {
      dispatch({
        type: 'staffList/hideModal',
      })
    },
  }

  const CountDown = {
    onSendItem (id) {
      let timeLists = {
        ...timeList,
        [id]: {
          seconds: 60,
          text: '再次发送邀请短信',
          isDisabled: false,
        },
      }
      dispatch({ type: 'staffList/changeID', payload: timeLists })
      dispatch({ type: 'staffList/sendItem', payload: id })
      let wait = timeLists[id].seconds
      function setTime () {
        if (wait === 0) {
          dispatch({
            type: 'staffList/changeID',
            payload: { [id]: { seconds: 60, text: '再次发送邀请短信', isDisabled: false } },
          })
        } else {
          wait--
          dispatch({
            type: 'staffList/changeID',
            payload: { [id]: { text: `${wait}s后可重新发送`, seconds: wait, isDisabled: true } },
          })
          setTimeout(() => {
            setTime()
          },
            1000)
        }
      }
      setTime()
    },
  }

  const listProps = {
    commonLists: list,
    loading,
    pagination,
    rowKeys: 'id',
    columns: STAFF_LIST.concat([{ title: '操作', key: 'operation', width: 100, render: (text, record, index) =>
      <div style={{ width: 300 }}>{record.status === 'init' ?
        <div>
          <a onClick={() => listProps.onEditItem(record)}>编辑</a>
          <Button disabled={timeList[record.id] ? timeList[record.id].isDisabled : false} onClick={() => listProps.handlClicks(record, index)} className={styles.common_table_ml}>
            {timeList[record.id] ? timeList[record.id].text : '再次发送邀请短信'}
          </Button>
        </div> :
        <div>
          {record.status === 'disable' ? '' : <a onClick={() => listProps.onEditItem(record)}>编辑</a>}
        </div>
      }</div>,
    }]),
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'staffList/search', payload: data })
    },
    onEditItem (item) {
      item.agency_idD = findPathInTree(item.agency_id, orgTree, 'value')
      item.customerService = item.role_name === 'customer_service'
      dispatch({
        type: 'staffList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    handlClicks (record, index) {
      confirm({
        title: '再次发送邀请短信?',
        onOk () {
          CountDown.onSendItem(record.id, index)
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>员工</h1>
      <p className={styles.common_header_p}>在这个页面点击【新增员工】添加一位员工加入您的组织。您也可以通过Excel模板批量导入。添加员工成功后，员工会收到一个带有随机密码的邀请短信。</p>
      <Search {...searchPropsed} />
      <Btnget {...BtngetProps} />
      <List {...listProps} />
      <AddStaff {...AddstaffProps} />
    </div>
  )
}

StaffList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  staffList: PropTypes.object,
  loading: PropTypes.bool,
}

// export default connect(staffList=>(staffList))(StaffList)
export default connect(({ staffList }) => ({ staffList }))(StaffList)


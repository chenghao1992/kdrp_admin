import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Card, message } from 'antd'


import UserList from '../../components/cost/listPay'
import Search from '../../components/cost/searchPay'
import BatchButton from '../../components/cost/BatchButton'

function CostPay ({ location, dispatch, costPay }) {
  const { orgTree, list, loading, selectedRowKeys, pagination, queryParam, expand, isReset } = costPay

  const onRefreshList = () => {
    dispatch({
      type: 'costPay/queryList',
    })
  }

  const searchProps = {
    onSearch (data) {
      if (!loading) {
        let param = data
        param.page = 1
        param.page_size = pagination.pageSize
        if (param.agency_id.length > 0) {
          param.agency_id = param.agency_id[param.agency_id.length - 1]
        } else {
          param.agency_id = ''
        }
        dispatch({ type: 'costPay/search', payload: param })
        /* dispatch({type: 'costPay/queryList', payload: param});*/
      }
    },
    expand,
    onToggle (isExpand) {
      dispatch({
        type: 'costPay/onToggle',
        payload: !isExpand,
      })
    },
    orgTree,
    isReset,
  }

  const batchProps = {
    onBatch () {
      if (!loading) {
        if (selectedRowKeys.length > 0) {
          console.log(selectedRowKeys)
          let handleParam = {
            param: {
              employee_feebill_id: selectedRowKeys.toString(),
              status: 'pay_agreed',
            },
            onHandChange: onRefreshList,
          }
          console.log(handleParam)
          dispatch({ type: 'costPay/batchAction', payload: handleParam })
        } else {
          message.warning('请选择操作项')
        }
      } else {
        message.warning('不可重复操作')
      }
    },
    title: '批量发放?',
    text: '批量发放',
  }

  const rowSelection = {
    selectedRowKeys,
    onChange (selectedRowKeys) {
      dispatch({ type: 'costPay/changeSelectedRowKeys', payload: selectedRowKeys })
    },
    getCheckboxProps: record => ({
      disabled: record.status !== 'check_agreed', // Column configuration not to be checked
    }),
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'costPay/search', payload: data })

      /* dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))*/
    },
    onSelect: rowSelection,
    onAction (selectData, type) {
      /* dispatch({type: 'costPay/changeSelectedRowKeys',payload: selectPassArr});*/
      let passParam = {
        param: {
          employee_feebill_id: selectData,
          status: type,
        },
        onHandChange: onRefreshList,
      }
      dispatch({ type: 'costPay/batchAction', payload: passParam })
    },
  }


  return (
    <div>
      <Card title="费用发放" bordered={false}>
        <Search {...searchProps} />
        <br />
        <BatchButton {...batchProps} />
        <br />
        <UserList {...userListProps} />
      </Card>
    </div>
  )
}

CostPay.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  costPay: PropTypes.object,
}

export default connect(({ costPay }) => ({ costPay }))(CostPay)

import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Card, Alert, message } from 'antd'

import UserList from '../../components/cost/listAudit'
import Search from '../../components/cost/search'
import BatchButton from '../../components/cost/BatchButton'

function CostAudit ({ location, dispatch, costAudit }) {
  const { orgTree, list, loading, selectedRowKeys, pagination, queryParam, expand, isReset } = costAudit

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
        dispatch({ type: 'costAudit/search', payload: param })
        /* dispatch({type: 'costAudit/queryList', payload: param});*/
      }
    },
    expand,
    onToggle (isExpand) {
      dispatch({
        type: 'costAudit/onToggle',
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
          let handleParam = {
            employee_feebill_id: selectedRowKeys.toString(),
            status: 'check_agreed',
          }
          dispatch({ type: 'costAudit/batchAction', payload: handleParam })
        } else {
          message.warning('请选择操作项')
        }
      } else {
        message.warning('不可重复操作')
      }
    },
    title: '批量通过?',
    text: '批量通过',
  }

  const rowSelection = {
    selectedRowKeys,
    onChange (selectedRowKeys) {
      dispatch({ type: 'costAudit/changeSelectedRowKeys', payload: selectedRowKeys })
    },
    getCheckboxProps: record => ({
      disabled: record.status !== 'checking', // Column configuration not to be checked
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
      dispatch({ type: 'costAudit/search', payload: data })

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
      /* dispatch({type: 'costAudit/changeSelectedRowKeys',payload: selectPassArr});*/
      let passParam = {
        employee_feebill_id: selectData,
        status: type,
      }
      dispatch({ type: 'costAudit/batchAction', payload: passParam })
    },
  }

  return (
    <div>
      <Card title="费用审核" bordered={false}>
        <Alert message="这里显示了每个月每位兼职客服的服务费。对公机构服务费的审核不在这里体现。" type="warning" showIcon />
        <Search {...searchProps} />
        <br />
        <BatchButton {...batchProps} />
        <br />
        <UserList {...userListProps} />
      </Card>
    </div>
  )
}

CostAudit.propTypes = {
  // children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  costAudit: PropTypes.object,
}

export default connect(({ costAudit }) => ({ costAudit }))(CostAudit)

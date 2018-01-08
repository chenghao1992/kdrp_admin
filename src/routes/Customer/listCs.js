import React, { PropTypes } from 'react'
import { connect } from 'dva'


import CustomerList from '../../components/customer/ListCs'
import CustomerSearch from '../../components/customer/SearchCs'
import CustomerButton from '../../components/customer/ActionButtonCs'
import CommitModal from '../../components/customer/commitModal'
import styles from '../../components/common_list.less'


function CustomerListCs ({ dispatch, customerListCs, loading }) {
  const { orgTree, list, pagination, query, selectedRowKeys, commitModalVisible, expand, resetOrg } = customerListCs


  const customerSearchProps = {
    resetOrg,
    query () {
      dispatch({
        type: 'customerListCs/query',
      })
    },
    resetOrgTree () {
      dispatch({
        type: 'customerListCs/resetOrgTree',
      })
    },
    orgValue: query['agency.idList'],
    orgTree,
    onSearch (searchData) {
      dispatch({
        type: 'customerListCs/search',
        payload: {
          ...searchData,

          page: 1,
          page_size: pagination.pageSize,
        },
      })
    },
    expand,
    onToggle (isExpand) {
      dispatch({
        type: 'customerListCs/onToggle',
        payload: !isExpand,
      })
    },
  }

  const customerButtonsProps = {
    loading,
    selectedRowKeys,
    handleCommit () {
      console.log('批量上交')
      dispatch({
        type: 'customerListCs/batchCommit',
      })
    },
  }

  const customerListProps = {
    selectedRowKeys,
    loading,
    dataSource: list,
    pagination,
    onTableChange (page) {
      dispatch({
        type: 'customerListCs/query',
        payload: {
          page: page.current,
          page_size: page.pageSize,
        },
      })
    },
    onSelectedRowChange (selectedRowKeys) {
      dispatch({
        type: 'customerListCs/setSelectedRowKeys',
        payload: {
          selectedRowKeys,
        },
      })
    },
    onCommit (id) {
      return function () {
        console.log(`分配:${id}`)
        dispatch({
          type: 'customerListCs/commit',
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

  const commitModalProps = {
    commitModalVisible,
    selectedRowKeys,
    handleChange,
    onOk () {
      dispatch({
        type: 'customerListCs/commitAsync',
      })
    },
    onCancel () {
      dispatch({
        type: 'customerListCs/commitModelHide',
      })
    },
  }


  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>客户管理</h1>
      <p className={styles.common_header_p}>在这个页面管理你的客户。您可以将客户上交到上级客户池。您还可以通过账户可用余额分级查看功能，提醒客户充分利用闲置资金再次购买理财产品。系统每5分钟同步客户数据一次。对于新绑定的客户，您将在5分钟内看到他的客户信息。</p>
      <CustomerSearch {...customerSearchProps} />
      <CustomerButton {...customerButtonsProps} />
      <CustomerList {...customerListProps} />

      <CommitModal {...commitModalProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    customerListCs: state.customerListCs,
    selectSalesman: state.selectSalesman,
    loading: state.loading.models.customerListCs,
  }
}

CustomerListCs.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  customerListCs: PropTypes.object,
  selectSalesman: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(CustomerListCs)


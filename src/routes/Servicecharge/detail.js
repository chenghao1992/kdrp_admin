import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Card } from 'antd'

import UserList from '../../components/servicecharge/detailList'


function ServiceChargeDetail ({ location, dispatch, serviceChargeDetail }) {
  const { list, loading, pagination, queryParam } = serviceChargeDetail

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      data.bill_uuid = queryParam.bill_uuid
      dispatch({ type: 'serviceChargeDetail/search', payload: data })
    },
  }

  return (
    <div>
      <Card title="服务费明细" bordered={false} >
        <UserList {...userListProps} />
      </Card>
    </div>
  )
}

ServiceChargeDetail.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  serviceChargeDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ serviceChargeDetail }) => ({ serviceChargeDetail }))(ServiceChargeDetail)

import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Card, Alert } from 'antd'

import NumberCard from '../../components/dashboard/numberCard'
import UserList from '../../components/servicecharge/list'


function ServiceCharge ({ location, dispatch, serviceCharge }) {
  const { numbers, list, loading, pagination } = serviceCharge
  const numberCards = numbers.map((item, key) => <Col key={key} lg={8} md={12}>
    <NumberCard {...item} />
  </Col>)

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      let data = {
        page: page.current,
        page_size: page.pageSize,
      }
      dispatch({ type: 'serviceCharge/queryList', payload: data })
    },
  }

  return (
    <div>
      <Card title="服务费" bordered={false}>
        <Alert message="当月服务费结算流水单会在次月1日自动生成。次月10日发放到您的金服账号。" type="warning" showIcon />
        {numberCards}
      </Card>
      <Card title="服务费账单" bordered={false} >
        <UserList {...userListProps} />
      </Card>
    </div>
  )
}

ServiceCharge.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  serviceCharge: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ serviceCharge }) => ({ serviceCharge }))(ServiceCharge)

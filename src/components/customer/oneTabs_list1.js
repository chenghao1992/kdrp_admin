/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { Form, Row, Col } from 'antd'
import styles from '../../components/common_list.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const grid3 = {
  lg: 8,
  xs: 8,
}

function List1 ({
  code,
}) {
  return (
    <div>
      <Form>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'真实姓名：'}>{code.name || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'性别：'}>{code.sex || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'账户余额：'}>{code.available || '--'}</FormItem></Col>
        </Row>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'注册时间：'}>{code.register_time || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'开户时间：'}>{code.pnr_time || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'首投时间：'}>{code.first_invest_time || '--'}</FormItem></Col>
        </Row>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'最后一次登录：'}>{code.last_login || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'是否开户：'}>{code.is_pnr ? '是' : '否'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'是否投资：'}>{code.is_invest ? '是' : '否'}</FormItem></Col>
        </Row>
        <div className={styles.customerDetail_container_hr}></div>
        <h2 className={styles.common_h2}>联系信息</h2>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'关系：'}>{code.contact_relation_type || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'手机号：'}>{code.mobile || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'邮箱：'}>{code.email || '--'}</FormItem></Col>
        </Row>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'备用手机：'}>{code.mobile2 || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'固定电话：'}>{code.phone || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'微信号：'}>{code.wechat || '--'}</FormItem></Col>
        </Row>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'QQ：'}>{code.qq || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'工作单位：'}>{code.work || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'地址：'}>{code.address || '--'}</FormItem></Col>
        </Row>
        <div className={styles.customerDetail_container_hr}></div>
        <h2 className={styles.common_h2}>业务属性</h2>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'客户归属：'}>{code.ownership || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'业主代码：'}>{code.owner_code || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'员工代码：'}>{code.staff_code || '--'}</FormItem></Col>
        </Row>
        <Row gutter={15}>
          <Col {...grid3}><FormItem {...formItemLayout} label={'注册来源：'}>{code.register_source || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'电销客服：'}>{code.electricity_employee || '--'}</FormItem></Col>
          <Col {...grid3}><FormItem {...formItemLayout} label={'分销客服：'}>{code.drp_employee || '--'}</FormItem></Col>
        </Row>
      </Form>
    </div>
  )
}

List1.propTypes = {
  code: PropTypes.object,
}

export default Form.create()(List1)

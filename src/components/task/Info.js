import React, { PropTypes } from 'react'
import styles from './Info.css'
import { Card, Button, Form, Row, Col, Progress } from 'antd'
import { Link } from 'dva/router'


const FormItem = Form.Item

function Info ({ details }) {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }


  return (
    <div className={styles.normal}>
      <Card title="任务详情" bordered={false} extra={<Button><Link to="/task/taskList">返回</Link></Button>}>
        <Form
          className="ant-advanced-search-form"
        >
          <Row gutter={20}>
            <Col xs={24} lg={12}>
              <FormItem {...formItemLayout} label={'任务名称'}>{details.name}</FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem {...formItemLayout} label={'任务类型'}>{details.type}</FormItem>
            </Col>
          </Row> <Row gutter={20}>
          <Col xs={24} lg={12}>
            <FormItem {...formItemLayout} label={'创建时间'}>{details.create_time}</FormItem>
          </Col>
          <Col xs={24} lg={12}>
            <FormItem {...formItemLayout} label={'完成时间'}>{details.complete_time || '--'}</FormItem>
          </Col>
        </Row> <Row gutter={20}>
          <Col xs={24} lg={12}>
            <FormItem {...formItemLayout} label={'状态'}>{details.status}</FormItem>
          </Col>
          <Col xs={24} lg={12}>
            <FormItem {...formItemLayout} label={'进度'}><Progress percent={details.progress} strokeWidth={5} /></FormItem>
          </Col>
        </Row> <Row gutter={20}>
          <Col xs={24} lg={24}>
            <FormItem {...{
              labelCol: { span: 5 },
              wrapperCol: { span: 19 },
            }} label={'描述'}
            >{details.desc || '无'}</FormItem>
          </Col>
        </Row>

        </Form>
      </Card>

    </div>
  )
}

Info.propTypes = {
  details: PropTypes.object,
}

export default Info

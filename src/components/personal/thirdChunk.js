import React, { PropTypes } from 'react'
import { Card, Col, Row, Form } from 'antd'
const FormItem = Form.Item

function ThirdChunk ({ obj }) {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const colLayout = {
    xl: 8,
    lg: 8,
    md: 12,
    xs: 24,
  }
  const children = []
  obj.forEach((item, index) => {
    children.push(
      <Col {...colLayout} key={index}>
            <FormItem {...formItemLayout} label={item.level_key}>
              <span>{item.level_name}</span>
            </FormItem>
          </Col>

    )
  })
  return (
    <Card title="组织信息" bordered bodyStyle={{}}>
      <div className="personal_info">
        <div className="right_con">
          <Row gutter={40}>
            <Col span={24}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  )
}

ThirdChunk.propTypes = {
  obj: PropTypes.array,
}

export default ThirdChunk

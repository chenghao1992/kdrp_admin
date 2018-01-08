import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, DatePicker } from 'antd'
import styles from '../common_list.less'
// import classNames from 'classnames'
// import { COMPANY_STATUS } from '../../utils/enums'

const FormItem = Form.Item
const { RangePicker } = DatePicker

function Search ({
  onSearch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const handleReset = () => {
    resetFields()
  }

  function handleSearch (e) {
    e.preventDefault()
    const createTime = getFieldValue('create_time')
    const data = {
      ...getFieldsValue(),
      create_time: createTime && `${createTime[0].format('YYYY-MM-DD HH:mm:ss')}~${createTime[1].format('YYYY-MM-DD HH:mm:ss')}`,
    }
    onSearch(data)
  }

  return (
    <Form
      className="ant-advanced-search-form"
      onSubmit={handleSearch}
    >
      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'任务名称'}>
            {getFieldDecorator('name')(
              <Input placeholder="请输入任务名称" />
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'创建时间'}>
            {getFieldDecorator('create_time')(
              <RangePicker
                placeholder={['开始时间', '结束时间']}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row className={styles.common_search_list}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清除
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Search)


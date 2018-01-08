import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, DatePicker, Select } from 'antd'
import styles from '../common_list.less'
import { COMPANY_STATUS } from '../../utils/enums'
import classNames from 'classnames'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const Option = Select.Option

function Search ({
  expand,
  onToggle,
  onSearch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const handleReset = () => {
    resetFields()
  }

  const toggle = () => {
    onToggle(expand)
  }

  function handleSearch (e) {
    e.preventDefault()
    const rangeTime = getFieldValue('create_time')
    const data = {
      ...getFieldsValue(),
      create_time: rangeTime && `${rangeTime[0].format('YYYY-MM-DD HH:mm:ss')}~${rangeTime[1].format('YYYY-MM-DD HH:mm:ss')}`,
    }
    console.log(data)
    onSearch(data)
  }

  let companyStatus = []
  for (let x in COMPANY_STATUS) {
    if (COMPANY_STATUS[x]) {
      companyStatus.push(<Option key={x}>{COMPANY_STATUS[x]}</Option>)
    }
  }

  return (
    <Form
      className="ant-advanced-search-form"
      onSubmit={handleSearch}
    >
        <Row gutter={40}>

          <Col xs={24} lg={11}>
            <FormItem {...formItemLayout} label={'机构名称'}>
              {getFieldDecorator('name')(
                <Input placeholder="请输入机构名称" />
              )}
            </FormItem>
          </Col>
          <Col xs={24} lg={11}>
            <FormItem {...formItemLayout} label={'状态'}>
              {getFieldDecorator('status')(
                <Select placeholder="请选择状态">
                  {
                    companyStatus
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div className={classNames({ [styles.common_d_none]: !expand })}>
        <Row gutter={40}>
          <Col xs={24} lg={11}>
            <FormItem {...formItemLayout} label={'业务联系人姓名'}>
              {getFieldDecorator('contact.name')(
                <Input placeholder="请输入业务联系人姓名" />
              )}
            </FormItem>
          </Col>
          <Col xs={24} lg={11}>
            <FormItem {...formItemLayout} label={'业务联系人手机号'}>
              {getFieldDecorator('contact.mobile')(
                <Input placeholder="请输入业务联系人手机号" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>

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
        </div>
      <Row className={styles.common_search_list}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清除
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>{expand ? '收起搜索' : '展开搜索'}<Icon
            type={expand ? 'up' : 'down'}
          />
          </a>
        </Col>
      </Row>
    </Form>
  )
}
Search.propTypes = {
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  onSearch: PropTypes.func,
  form: PropTypes.object,
}


export default Form.create()(Search)


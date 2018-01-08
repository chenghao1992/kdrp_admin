import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, DatePicker, Cascader, Select } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'

import { COMPANY_STATUS } from '../../utils/enums'


const FormItem = Form.Item
const { RangePicker } = DatePicker
const Option = Select.Option


function Search ({
  queryByPreQuery,
  resetOrg,
  handleOrgChange,
  resetOrgTree,
  orgValue,
  orgTree,
  onSearch,
  expand,
  onToggle,
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
    // 无法reset组织树，只能通过改变state？
    resetOrgTree()
  }

  if (resetOrg) {
    setTimeout(() => {
      resetFields()
      resetOrgTree()
      queryByPreQuery()
    }, 0)
  }

  const toggle = () => {
    onToggle(expand)
  }

  function handleSearch (e) {
    e.preventDefault()
    const startEndTime = getFieldValue('start_end_time')
    // const orgId = getFieldValue('id');

    const data = {
      ...getFieldsValue(),
      start_end_time: startEndTime && `${startEndTime[0].format('YYYY-MM-DD HH:mm:ss')}~${startEndTime[1].format('YYYY-MM-DD HH:mm:ss')}`,
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
            <FormItem {...formItemLayout} label={'组织'}>
              {getFieldDecorator('id', {
                initialValue: orgValue,
              })(
                <Cascader
                  onChange={handleOrgChange}
                  placeholder="请选择组织"
                  options={orgTree} changeOnSelect
                />
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
            <FormItem {...formItemLayout} label={'管理员帐号'}>
              {getFieldDecorator('manager.username')(
                <Input placeholder="请输入管理员帐号" />
              )}
            </FormItem>
          </Col>
          <Col xs={24} lg={11}>
            <FormItem {...formItemLayout} label={'管理员姓名'}>
              {getFieldDecorator('manager.real_name')(
                <Input placeholder="管理员姓名" />
              )}
            </FormItem>
          </Col>
        </Row>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'创建时间'}>
            {getFieldDecorator('start_end_time')(
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
  queryByPreQuery: PropTypes.func,
  resetOrg: PropTypes.bool,
  handleOrgChange: PropTypes.func,
  resetOrgTree: PropTypes.func,
  orgValue: PropTypes.array,
  orgTree: PropTypes.array,
  onSearch: PropTypes.func,
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Search)


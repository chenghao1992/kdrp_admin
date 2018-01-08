import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, DatePicker, Cascader } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'


const FormItem = Form.Item
const { RangePicker } = DatePicker

function staffInvestSearch ({
  timeValue,
  orgTree,
  expand,
  onSearch,
  isReset,
  form: {
    getFieldDecorator,
    resetFields,
    getFieldsValue,
    getFieldValue,
  },
}) {
  if (isReset) {
    setTimeout(() => {
      resetFields()
    }, 500)
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const elaticLayout = {
    xs: 24,
    lg: 12,
  }

  const handleReset = () => {
    resetFields()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const rangeTime = getFieldValue('start_end_time')
    let dates
    if (rangeTime !== undefined) {
      dates = rangeTime.length > 0 ? `${rangeTime[0].format('YYYY-MM-DD')}~${rangeTime[1].format('YYYY-MM-DD')}` : ''
    } else {
      dates = ''
    }
    const data = {
      ...getFieldsValue(),
      start_end_time: dates,
    }
    console.log(data)
    onSearch(data)
  }

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
      <div className={classNames({ [styles.common_d_none]: !expand })}>
      <Row>
        <Col {...elaticLayout}>
          <FormItem {...formItemLayout} label={'组织选择'}>
            {getFieldDecorator('agency_id', { initialValue: [] })(
              <Cascader options={orgTree} placeholder="请选择组织" changeOnSelect />
            )}
          </FormItem>
        </Col>
        <Col {...elaticLayout}>
          <FormItem {...formItemLayout} label={'创建时间'}>
            {getFieldDecorator('start_end_time', { initialValue: timeValue })(
              <RangePicker
                placeholder={['开始时间', '结束时间']}
                showTime
                format="YYYY-MM-DD"
              />
            )}
          </FormItem>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button className={styles.common_search_clear} onClick={handleReset}>清除</Button>
        </Col>
      </Row>
    </Form>
  )
}

staffInvestSearch.propTypes = {
  expand: PropTypes.bool,
  form: PropTypes.object,
  timeValue: PropTypes.array,
  orgTree: PropTypes.array,
  onSearch: PropTypes.func,
  isReset: PropTypes.bool,
}


export default Form.create()(staffInvestSearch)

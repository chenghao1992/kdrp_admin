import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Icon, DatePicker } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'
// import moment from 'moment'

const FormItem = Form.Item
const { RangePicker } = DatePicker

function SearchSub ({
  onSearch,
  expand,
  onToggle,
  timeValue,
  onDateOk,
  isReset,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) {
  const widthScroll = document.body.scrollWidth

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const handleReset = () => {
    resetFields()
  }

  const toggle = () => {
    onToggle(expand)
  }

  function handleSearch (e) {
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
    onSearch(data)
  }
  function onTimeOk (value) {
    onDateOk(value)
  }

  function disabledDate (current) {
    if (current) {
      return current.valueOf() > Date.now() /* || current.valueOf() < moment().subtract(1, 'years');*/
    }
    return true
  }

  if (isReset) {
    setTimeout(() => {
      resetFields()
    }, 500)
  }

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
      <div className={classNames({ [styles.common_d_none]: !expand })}>
      <Row>
        <Col span={widthScroll > 768 ? 12 : 24}>
          <FormItem {...formItemLayout} label={'查询日期'}>
            {getFieldDecorator('start_end_time', { initialValue: timeValue })(
              <RangePicker
                showTime
                disabledDate={disabledDate}
                placeholder={['开始时间', '结束时间']}
                format="YYYY-MM-DD"
                onOk={onTimeOk}
              />
            )}
          </FormItem>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清除
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12, display: 'none' }} onClick={toggle}>{expand ? '收起搜索' : '展开搜索'}<Icon
            type={expand ? 'up' : 'down'}
          />
          </a>
        </Col>
      </Row>

    </Form>
  )
}

SearchSub.propTypes = {
  onSearch: PropTypes.func,
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  timeValue: PropTypes.array,
  onDateOk: PropTypes.func,
  isReset: PropTypes.bool,
  form: PropTypes.object,
}

export default Form.create()(SearchSub)


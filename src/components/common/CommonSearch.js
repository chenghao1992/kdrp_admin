/**
 * Created by xiaoys on 2017/10/25.
 */
import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, DatePicker, Cascader, Select } from 'antd'
import styles from '../../components/common_list.less'
import classNames from 'classnames'

const FormItem = Form.Item
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

class Search extends React.Component {
  state = {
    expand: true,
  };

  getIt (searchCode) {
    const lists = []
    for (let i = 0; i < searchCode.length; i++) {
      const v = searchCode[i].list.map((item, key) => {
        if (item.type === 'Input') {
          return (
            <Col {...this.props.grid} key={key}>
              <FormItem {...formItemLayout} label={item.label}>
                {this.props.form.getFieldDecorator(item.key)(
                  <Input placeholder={item.placeholder} />
                )}
              </FormItem>
            </Col>
          )
        } else if (item.type === 'Select') {
          return (
            <Col {...this.props.grid} key={key}>
              <FormItem {...formItemLayout} label={item.label}>
                {this.props.form.getFieldDecorator(item.key)(
                  <Select placeholder={item.placeholder}>
                    {this.props.SelectList}
                  </Select>
                )}
              </FormItem>
            </Col>
          )
        } else if (item.type === 'Cascader') {
          return (
            <Col {...this.props.grid} key={key}>
              <FormItem {...formItemLayout} label={item.label}>
                {this.props.form.getFieldDecorator(item.key)(
                  <Cascader options={this.props.CascaderList} placeholder={item.placeholder} changeOnSelect />
                )}
              </FormItem>
            </Col>
          )
        } else if (item.type === 'RangePicker') {
          return (
            <Col {...this.props.grid} key={key}>
              <FormItem {...formItemLayout} label={item.label}>
                {this.props.form.getFieldDecorator(item.key)(
                  <RangePicker
                    placeholder={item.placeholder}
                    showTime
                    format={this.props.dateInit}
                  />
                )}
              </FormItem>
            </Col>
          )
        }
        return true
      })
      lists.push(v)
    }
    return lists
  }

  handleReset = () => {
    const { resetFields } = this.props.form
    resetFields()
  };
  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  };

  handleSearch = (e) => {
    e.preventDefault()
    const data = { ...this.props.form.getFieldsValue() }
    this.props.onSearch(data)
  }

  render () {
    return (
      <Form className={styles.common_margin_b20} onSubmit={this.handleSearch}>
        {
          this.getIt(this.props.code).map((d, index) => {
            return (
              <div key={index + 1} className={classNames({ [styles.common_d_none]: !this.state.expand && index !== 0 })}>
                <Row gutter={15}>
                  {d}
                </Row>
              </div>
            )
          })
        }
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button className={styles.common_search_clear} onClick={this.handleReset}>清除</Button>
            <a className={styles.common_search_clear} onClick={this.toggle}>{this.state.expand ? '收起搜索' : '展开搜索'}<Icon
              type={this.state.expand ? 'up' : 'down'}
            />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}

Search.propTypes = {
  grid: PropTypes.object,
  form: PropTypes.object,
  SelectList: PropTypes.array,
  dateInit: PropTypes.string,
  rowSelection: PropTypes.object,
  commonLists: PropTypes.array,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  code: PropTypes.array,
  CascaderList: PropTypes.array,
}

export default Form.create()(Search)

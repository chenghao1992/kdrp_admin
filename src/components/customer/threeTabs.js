/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Row, Col, Button, Select, message } from 'antd'
import styles from '../../components/common_list.less'
import { uploadSrc } from '../../utils/config'

import OSSUpload from '../common/OSSUpload'

const Option = Select.Option


const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
}

const formItemLayout1 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
}

function ThreeTabs ({
  remarkType,
  fileList,
  keys,
  setFileList,
  setIsUpLoading,
  isUploading,
  deleteKeys,
  setKeys,
  onHandle,
  deleteList,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
}) {
  const selectList = remarkType.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)

  const handlerRelationship = (values, q) => {
    for (let i = 0; i < values.length; i ++) {
      if (values[i].name === q) {
        return values[i].id
      }
    }
    return true
  }

  const handleReset = () => {
    deleteList()
    resetFields()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const q = values.remark_type_id === '成交' ? handlerRelationship(remarkType, values.remark_type_id) : values.remark_type_id

      const params = { ...values, attachments: keys, remark_type_id: q }
      onHandle(params, resetFields)
    })
  }

  const UploadProps = {
    accept: 'image/jpeg,image/jpg,image/gif,image/png,image/bmp,text/plain, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: false,
    resetName: '批量上传',
    uploadSrc, // 上传阿里云接口
    uploadType: 'btn', // 上传类型
    typeList: 'Customer',
    tokenUrl: '/api/oss/upload_token/',
    isUploading, // 判断是否上传中,
    setKeys,
    fileList,
    deleteKeys,
    keys,
    handleChange (info) {
      let fileList = info.fileList
      if (info.file.originFileObj) {
        setFileList(fileList)
      }
      if (info.file.status === 'uploading') {
        setIsUpLoading(true)
      }
      if (info.file.status === 'done') {
        setIsUpLoading(false)
        setKeys(`${localStorage.getItem('file_prefix')}${info.file.name}`)
        localStorage.clear('file_prefix')
        message.success('文件上传成功')
      } else if (info.file.status === 'error') {
        setIsUpLoading(false)
        message.error('文件上传失败')
      }
    },
    handleBeforeUpload (file) {
      if (file.size / 1024 / 1024 > 5) {
        message.error('文件大小不能超过5M')
        return false
      }
      if (fileList.length >= 20) {
        message.error('上传文件不能超过20个')
        return false
      }

      for (let i = 0; i < fileList.length; i ++) {
        if (fileList[i].name === file.name) {
          message.error('文件名不能重复', 5)
          return false
        }
      }
      return true
    },
  }

  return (
    <div>
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <FormItem label="备注类型：" hasFeedback {...formItemLayout1}>
          {getFieldDecorator('remark_type_id', {
            initialValue: '成交',
            rules: [
              {
                required: true,
                message: '请选择备注类型',
              },
            ],
          })(
            <Select placeholder="请选择备注类型">
              {selectList}
            </Select>)}
        </FormItem>
        <FormItem label="备注内容：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: '请输入备注内容',
              },
            ],
          })(<Input type="textarea" placeholder="请输入备注内容" style={{ height: 100 }} />)}
        </FormItem>
        <FormItem label="附件:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('keys', {
            initialValue: '',
          })(
            <OSSUpload {...UploadProps} />
          )}
        </FormItem>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button className={styles.common_search_clear} onClick={handleReset}>取消</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

ThreeTabs.propTypes = {
  remarkType: PropTypes.string,
  fileList: PropTypes.array,
  keys: PropTypes.array,
  setFileList: PropTypes.func,
  setIsUpLoading: PropTypes.func,
  isUploading: PropTypes.bool,
  deleteKeys: PropTypes.func,
  setKeys: PropTypes.func,
  onHandle: PropTypes.func,
  deleteList: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(ThreeTabs)

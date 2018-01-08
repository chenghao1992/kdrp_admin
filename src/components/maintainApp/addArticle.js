  /**
 * Created by xiaoys on 2017/9/1.
 */
import React, { PropTypes } from 'react'
import { Form, Input, DatePicker, Card, Radio, message, Button, Select, Spin } from 'antd'
import AddEdit from './addEdit'
import { Rules } from '../../utils/verificationCode'
import { uploadSrc } from '../../utils/config'
import { hashHistory } from 'dva/router'
import styles from './article.less'
import moment from 'moment'

import OSSUpload from '../common/OSSUpload'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

function AddArticleEdit ({
  fileList = [],
  setFileListNum,
  changeImage,
  imageUrl,
  onChange,
  uploadSpan,
  changeEidts,
  onSubmit,
  articleDetails = {},
  codeList,
  spanStatus,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    validateFields,
    resetFields,
  },
}) {
  const stateOpt = codeList.map((item, key) => <Option key={key} value={item.value}>{item.name}</Option>)

  const formItemLayout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const editProps = {
    onChange,
    spanStatus,
    saveProblem: articleDetails,
  }

  const onCannel = () => {
    resetFields()
    hashHistory.push('/maintainApp/consultationArticle')
  }

  function onChanges (value, dateString) {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  function onOk (value) {
    console.log('onOk: ', value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let someFileUploaded = false
    // todo 在这里设置key值不太对，只能支持上传单个文件的，多个文件的，需要修改OSSUpload;
    console.log(fileList)
    fileList.forEach((value) => {
      someFileUploaded = someFileUploaded || (value.status === 'done')
    })
    if (someFileUploaded) {
      validateFields((errors) => {
        if (errors) {
          return
        }
        if (!changeEidts & !articleDetails.content) {
          message.error('请填写文章内容', 1)
          return
        }
        const timer = getFieldValue('release_time')
        const displayStatus = getFieldValue('display') ? 1 : 0
        const date = timer ? timer.format('YYYY-MM-DD HH:mm:ss') : ''
        const data = {
          ...getFieldsValue(),
          image_url: imageUrl || articleDetails.image_url,
          release_time: date,
          content: changeEidts || !articleDetails.content,
          display: displayStatus,
          id: articleDetails.id || '',
        }
        onSubmit(data, resetFields)
      })
    } else {
      message.error('尚未有成功上传的图片，请稍后再试')
    }
  }

  const UploadProps = {
    accept: 'image/jpeg,image/jpgimage/gif,image/png,image/bmp',
    uploadSrc, // 上传阿里云接口
    uploadType: 'imageBtn', // 上传类型
    typeList: 'Cms',
    tokenUrl: '/api/oss/upload_token/',
    fileList,
    handleChange (info) {
      let fileList = info.fileList
      fileList = fileList.slice(-1)
      setFileListNum(fileList)
      if (info.file.status === 'done') {
        const lastUrl = `${uploadSrc}/${localStorage.getItem('file_prefix')}${info.file.name}`
        changeImage(lastUrl)
        localStorage.clear('file_prefix')
      }
    },
    handleBeforeUpload (file) {
      if (file.size / 1024 / 1024 > 2) {
        message.error('图片大小不能超过2M')
        return false
      }

      if (UploadProps.accept.split(',').indexOf(file.type) === -1) {
        message.error('只支持jpg、jpeg、gif、png、bmp格式', 5)
        return false
      }
      return true
    },
  }

  return (
    <div>
        <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
          <Card title="基本信息" className={styles.normal}>
          <FormItem label="文章标题：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: articleDetails.title,
              rules: [
                {
                  ...Rules.lessName,
                  required: true,
                },
              ],
            })(<Input placeholder="请输入中文标题" />)}
          </FormItem>
          <FormItem label="副标题：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('sub_title', {
              initialValue: articleDetails.sub_title,
              rules: [
                {
                  ...Rules.lessName,
                  required: false,
                },
              ],
            })(<Input placeholder="请输入中文标题" />)}
          </FormItem>
          <FormItem label="栏目：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('catalog_id', {
              initialValue: articleDetails.catalog_id,
              rules: [
                {
                  message: '请选择栏目',
                  required: true,
                },
              ],
            })(<Select placeholder="请选择状态">
              {stateOpt}
            </Select>)}
          </FormItem>
          <FormItem label="排序：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: articleDetails.level,
              rules: [
                {
                  ...Rules.justNumber,
                  required: false,
                },
              ],
            })(<Input placeholder="请输入阿拉伯数字，1为最靠前。" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={'发稿时间'}>
            {getFieldDecorator('release_time', {
              initialValue: articleDetails.release_time ? moment(`${articleDetails.release_time}` || '', 'YYYY-MM-DD HH:mm:ss') : '',
              rules: [
                {
                  required: true,
                  message: '请选择时间',
                },
              ],
            })(
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间"
                onChange={onChanges}
                onOk={onOk}
              />
            )}
          </FormItem>
          <FormItem label="状态:" hasFeedback {...formItemLayout}>
            {getFieldDecorator('display', {
              initialValue: articleDetails.display,
              rules: [
                {
                  ...Rules.justBoolean,
                  required: true,
                },
              ],
            })(
              <RadioGroup >
                <Radio value>显示</Radio>
                <Radio value={false}>隐藏</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="缩略图:" hasFeedback {...formItemLayout}>
            {getFieldDecorator('image_url', {
              initialValue: articleDetails.image_url || imageUrl,
              rules: [
                {
                  required: true,
                  message: '请选择图片上传',
                },
              ],
            })(
              <OSSUpload {...UploadProps} />
            )}
          </FormItem>
          </Card>
          <Card title="文章详情">
            <Spin spinning={uploadSpan} tip="图片上传中,请稍后...">
              <div>
                {
                  articleDetails.title ?
                    <div>
                      {articleDetails.content ? <AddEdit {...editProps} /> : ''}
                    </div> :
                    <div>
                      <AddEdit {...editProps} />
                    </div>
                }
              </div>
            </Spin>
          </Card>
          <div style={{ float: 'right', marginTop: -15 }}>
            <Button style={{ marginRight: 20 }} onClick={() => { onCannel() }}>取消</Button>
            <Button type="primary" htmlType="submit">保存并提交</Button>
          </div>
        </Form>
    </div>


  )
}

AddArticleEdit.propTypes = {
  fileList: PropTypes.array,
  setFileListNum: PropTypes.func,
  form: PropTypes.object,
  changeImage: PropTypes.func,
  imageUrl: PropTypes.string,
  onChange: PropTypes.func,
  changeEidts: PropTypes.string,
  onSubmit: PropTypes.func,
  articleDetails: PropTypes.object,
  uploadSpan: PropTypes.bool,
  codeList: PropTypes.array,
  spanStatus: PropTypes.func,
}

export default Form.create()(AddArticleEdit)


/**
 * Created by xiaoys on 2017/9/5.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Radio, Modal, message } from 'antd'
import { Rules } from '../../utils/verificationCode'
import { uploadSrc } from '../../utils/config'

import OSSUpload from '../common/OSSUpload'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Addmodal = ({
  fileList,
  addVisible,
  type,
  item = {},
  onOk,
  onCancel,
  setFileListNum: setFileList,
  changeImages,
  imgUrl,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },
}) => {
  function handleOk () {
    console.log(fileList)
    let someFileUploaded = false
    // todo 在这里设置key值不太对，只能支持上传单个文件的，多个文件的，需要修改OSSUpload;
    fileList.forEach((value) => {
      someFileUploaded = someFileUploaded || (value.status === 'done')
    })
    if (someFileUploaded) {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = { ...getFieldsValue() }
        const datas = { ...data, image_url: imgUrl || item.image_url, display: data.display ? 1 : 0, id: item.id || '' }
        console.log(datas)
        onOk(datas, resetFields)
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

      // 只显示最近n个
      fileList = fileList.slice(-1)

      if (info.file.status === 'done') {
        const lastUrl = `${uploadSrc}/${localStorage.getItem('file_prefix')}${info.file.name}`
        changeImages(lastUrl)
        localStorage.clear('file_prefix')
      }

      setFileList(fileList)
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

  const modalOpts = {
    title: `${type === 'create' ? '新建' : '编辑'}`,
    visible: addVisible,
    onOk: handleOk,
    onCancel: () => {
      onCancel()
      resetFields()
    },
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                ...Rules.lessName,
                required: true,
              },
            ],
          })(<Input placeholder="请填写名称" />)}
        </FormItem>

        <FormItem label="状态:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('display', {
            initialValue: item.display,
            rules: [
              {
                ...Rules.justBoolean,
                message: '请选择是否显示或隐藏',
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

        <FormItem label="链接网址：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('image_url_address', {
            initialValue: item.image_url_address,
            rules: [
              {
                ...Rules.allName,
                required: true,
              },
            ],
          })(<Input placeholder="请输入链接网址" />)}
        </FormItem>

        <FormItem label="图片上传:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('image_url', {
            initialValue: item.image_url || imgUrl,
            rules: [
              {
                required: true,
                message: '图片未上传',
              },
            ],
          })(
            <OSSUpload {...UploadProps} />
          )}
          <span>为了更好的体验,图片大小建议为736PX * 400PX</span>
        </FormItem>

      </Form>
    </Modal>
  )
}

Addmodal.propTypes = {
  orgTree: PropTypes.array,
  addVisible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
  fileList: PropTypes.array,
  setFileListNum: PropTypes.func,
  changeImages: PropTypes.func,
  imgUrl: PropTypes.string,
}

export default Form.create()(Addmodal)

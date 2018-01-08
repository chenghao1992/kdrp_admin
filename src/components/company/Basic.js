import React, { PropTypes } from 'react'
import { Card, Form, Input, Row, Col, message, Icon } from 'antd'
import styles from './Basic.css'
import Extra from '../ui/Extra'
import { Rules } from '../../utils/verificationCode'
import OSSUpload from '../common/OSSUpload'
import { uploadSrc } from '../../utils/config'

import img1 from '../../../assets/user.png'

const FormItem = Form.Item

function Basic ({
  editAbleState,
  data,
  handleCancel,
  handleEdit,
  handleSave,
  avatarUrl,
  isUploading,
  fileList,
  onMouseover,
  onMouseMove,
  addStatusOfImg,
  setFileListNum,
  disabledUpload,
  changeImage,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) {
  const { status } = data

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }


  const extraProps = {
    status: data.status,
    buttons: ['修改'],
    handleMenuClick (e) {
      if (e.key === '修改') {
        handleEdit()
      }
    },
    handleCancel () {
      handleCancel()
    },
    handleSave () {
      validateFields((errors, values) => {
        if (errors) {
          return
        }
        handleSave(values)
      })
    },

  }

  const UploadProps = {
    accept: 'image/jpeg,image/jpgimage/gif,image/png,image/bmp',
    personUrl: avatarUrl,
    uploadSrc,
    uploadType: 'image',
    typeList: 'Avatar',
    tokenUrl: '/api/oss/upload_token/',
    isUploading,
    fileList,
    onMouseover,
    onMouseMove,
    addStatusOfImg,
    handleChange (info) {
      let fileList = info.fileList
      fileList = fileList.slice(-1)
      setFileListNum(fileList)

      if (info.file.status === 'uploading') {
        disabledUpload(true)
        // message.loading('头像上传中...请稍后...');
      }
      if (info.file.status === 'done') {
        changeImage(localStorage.getItem('file_prefix') + info.file.name)
        localStorage.clear('file_prefix')
        message.success('头像修改成功')
      } else if (info.file.status === 'error') {
        disabledUpload(false)
        message.error('头像修改失败')
      }
    },
    handleBeforeUpload (file) {
      if (file.size / 1024 / 1024 > 2) {
        message.error('头像大小不能超过2M')
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
    <div className={styles.normal}>
    <Card title="基本信息" extra={editAbleState ? <Extra {...extraProps} /> : null}>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <Row type="flex" justify="space-around" align="middle">
            {status === 'edit' ?

            <Col>
              {editAbleState ?
                <OSSUpload {...UploadProps} />
                :
                <Icon type="plus" className={styles.uploaderTrigger} />
              }
              <p style={{ width: 150, height: 150, marginTop: 45 }}>支持jpg、jpeg、gif、png、bmp格式的图片。建议上传300X300像素以上的头像图片，获得满意的首页标示牌效果。</p>
            </Col> :
              <Col>
                {
                  avatarUrl ?
                    <div>
                      <img src={avatarUrl} className={styles.NotuploaderTrigger} alt="" />
                      <p style={{ width: 150, height: 150, marginTop: 5 }}>支持jpg、jpeg、gif、png、bmp格式的图片。建议上传300X300像素以上的头像图片，获得满意的首页标示牌效果。</p>
                    </div> :
                    <img src={img1} alt="" style={{ width: 150, height: 150 }} />
                }
              </Col>
            }
          </Row>
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <Form className="ant-advanced-search-form">
              <Row gutter={20}>
                <Col xs={24} lg={12}>
                  <FormItem {...formItemLayout} label={data.level === 1 ? '机构代码' : '组织代码'}>
                    {data.code}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col xs={24} lg={12}>
                  {status === 'edit' ?
                    <FormItem {...formItemLayout} label={'企业全称'}>
                    {getFieldDecorator('full_name', {
                      initialValue: data.full_name,
                      rules: [
                        {
                          required: true,
                          message: '请输入企业全称',
                        }, {
                          ...Rules.allName,
                        },
                      ],
                    })(
                      <Input placeholder="请输入企业全称" />
                    )}
                  </FormItem> : <FormItem {...formItemLayout} label={'企业全称'}>{data.full_name}</FormItem>}
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xs={24} lg={12}>
                  {status === 'edit' ?
                    <FormItem {...formItemLayout} label={'企业简称'}>
                    {getFieldDecorator('name', {
                      initialValue: data.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入企业简称',
                        }, {
                          ...Rules.lessName,
                        },
                      ],
                    })(
                      <Input placeholder="请输入企业简称" />
                    )}
                  </FormItem> : <FormItem {...formItemLayout} label={'企业简称'}>{data.name}</FormItem>}
                </Col>
              </Row>
          </Form>
        </Col>
      </Row>
      </Card>
    </div>
  )
}
Basic.propTypes = {
  editAbleState: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  avatarUrl: PropTypes.string,
  isUploading: PropTypes.bool,
  fileList: PropTypes.array,
  onMouseover: PropTypes.func,
  onMouseMove: PropTypes.func,
  addStatusOfImg: PropTypes.bool,
  setFileListNum: PropTypes.func,
  disabledUpload: PropTypes.func,
  changeImage: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Basic)

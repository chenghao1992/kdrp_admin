import React, { PropTypes } from 'react'
import { Card, Col, Row, Input, Form, Select, message } from 'antd'
import { uploadSrc } from '../../utils/config'
import OSSUpload from '../common/OSSUpload'
import styles from './chunk_com.less'
import Extra from '../ui/Extra'

import img1 from '../../../assets/user.png'
// import Ajax from 'robe-ajax'

const FormItem = Form.Item
const Option = Select.Option

function FirstChunk ({
  addStatusOfImg,
  onMouseMove,
  onMouseover,
  fileList,
  disabledUpload,
  isUploading,
  personUrl,
  changeImage,
  obj,
  buttonClick,
  fistChunk,
  editStatus,
  setFileListNum,
  form: {
    getFieldDecorator,
    resetFields,
    validateFieldsAndScroll,
  },
}) {
  console.log(editStatus)
  const handleCancleEdit = () => {
    resetFields()
    buttonClick.onHandleCancleEdit()
  }
  const colLayout = {
    xl: 12,
    lg: 12,
    md: 24,
  }
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const max = {
    max: 50,
    message: '最大长度为50',
  }
  const extraProps = {
    status: fistChunk.status,
    buttons: ['修改'],
    handleMenuClick (e) {
      if (e.key === '修改') {
        buttonClick.handleClickEdit()
      }
    },
    handleCancel () {
      handleCancleEdit()
    },
    handleSave (e) {
      e.preventDefault()
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.userId = obj.id
          buttonClick.onSave(values)
        }
      })
    },

  }
  // const label = <span>*</span>

  const UploadProps = {
    accept: 'image/jpeg,image/jpgimage/gif,image/png,image/bmp',
    personUrl, // 头像
    uploadSrc, // 上传阿里云接口
    uploadType: 'image', // 上传类型
    typeList: 'Avatar',
    tokenUrl: '/api/oss/upload_token/',
    isUploading, // 判断是否上传中
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
  console.log(personUrl)
  return (
    <Card title="个人信息" extra={editStatus ? <Extra {...extraProps} /> : ''}>
      <Row>

        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <Row type="flex" justify="space-around" align="middle">
            {fistChunk.status === 'edit' ?
            <Col>
              <OSSUpload {...UploadProps} />
              <p style={{ width: 150, height: 150, marginTop: 45 }}>支持jpg、jpeg、gif、png、bmp格式的图片。建议上传300X300像素以上的头像图片，获得满意的首页标示牌效果。</p>
            </Col> :
              <Col>
                {
                  personUrl ?
                    <div>
                      <img src={personUrl} className={styles.NotuploaderTrigger} alt="" />
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
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem {...formItemLayout} label="性别">
                    {getFieldDecorator('sex', {
                      initialValue: obj.sex,
                      rules: [{ required: true, message: '性别不能为空' }, { ...max }],
                    }
                    )(
                      <Select placeholder="请选择性别">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                        <Option value="其他">其他</Option>
                      </Select>
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={(<span><span style={{
                      color: 'red',
                      margin: '0px 3px 0 0',
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}>*</span>性别</span>)}
                  >{obj.sex}</FormItem>
                }

              </Col>
              <Col {...colLayout}>
                <FormItem {...formItemLayout}
                  label={'用户名'}
                >{obj.username}</FormItem>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem hasFeedback {...formItemLayout} label="身份证号码">
                    {getFieldDecorator('id_no', {
                      initialValue: obj.id_no,
                      rules: [{
                        required: true,
                        message: '身份证号码不能为空',
                      }, { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写正确的身份证号码' }],
                    }
                    )(
                      <Input placeholder={'请输入身份证号码'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={(<span><span style={{
                      color: 'red',
                      margin: '0px 3px 0 0',
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}>*</span>身份证号码</span>)}
                  >{obj.id_no}</FormItem>
                }

              </Col>
              <Col {...colLayout}>
                <FormItem {...formItemLayout}
                  label={'姓名'}
                >{obj.name}</FormItem>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem {...formItemLayout} label="身份证签发机关">
                    {getFieldDecorator('id_publisher', {
                      initialValue: obj.id_publisher,
                      rules: [],
                    }
                    )(
                      <Input placeholder={'请输入身份证签发机关'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={'身份证签发机关'}
                  >{obj.id_publisher}</FormItem>
                }

              </Col>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem hasFeedback {...formItemLayout} label="备用手机号">
                    {getFieldDecorator('mobile2', {
                      initialValue: obj.mobile2,
                      rules: [{ required: true, message: '备用手机号不能为空' }, {
                        pattern: /^1[34578]\d{9}$/,
                        message: '请填写正确的手机号码',
                      }],
                    }
                    )(
                      <Input placeholder={'请输入备用手机号'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={(<span><span style={{
                      color: 'red',
                      margin: '0px 3px 0 0',
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}>*</span>备用手机号</span>)}
                  >{obj.mobile2}</FormItem>
                }

              </Col>
            </Row>
            <Row gutter={20}>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem {...formItemLayout} label="紧急联系人">
                    {getFieldDecorator('emergency_contact', {
                      initialValue: obj.emergency_contact,
                      rules: [{ required: true, message: '紧急联系人不能为空' }, { ...max }],
                    }
                    )(
                      <Input placeholder={'请输入紧急联系人'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={(<span><span style={{
                      color: 'red',
                      margin: '0px 3px 0 0',
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}>*</span>紧急联系人</span>)}
                  >{obj.emergency_contact}</FormItem>
                }

              </Col>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem hasFeedback {...formItemLayout} label="固定电话">
                    {getFieldDecorator('phone', {
                      initialValue: obj.phone,
                      rules: [{ pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/, message: '请填写正确的电话号码' }],

                    }
                    )(
                      <Input placeholder={'请输入固定电话'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={'固定电话'}
                  >{obj.phone}</FormItem>
                }

              </Col>
            </Row>
            <Row gutter={20}>
              <Col {...colLayout}>
                {fistChunk.status === 'edit' ?
                  <FormItem hasFeedback {...formItemLayout} label="紧急联系人手机">
                    {getFieldDecorator('emergency_mobile', {
                      initialValue: obj.emergency_mobile,
                      rules: [{ required: true, message: '紧急联系人手机不能为空' }, {
                        pattern: /^1[34578]\d{9}$/,
                        message: '请填写正确的手机号码',
                      }],
                    }
                    )(
                      <Input placeholder={'请输入紧急联系人手机'} />
                    )}
                  </FormItem> : <FormItem {...formItemLayout}
                    label={(<span><span style={{
                      color: 'red',
                      margin: '0px 3px 0 0',
                      fontSize: '16px',
                      verticalAlign: 'middle',
                    }}>*</span>紧急联系人手机</span>)}
                  >{obj.emergency_mobile}</FormItem>
                }
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

FirstChunk.propTypes = {
  addStatusOfImg: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onMouseover: PropTypes.func,
  fileList: PropTypes.array,
  disabledUpload: PropTypes.func,
  isUploading: PropTypes.bool,
  personUrl: PropTypes.string,
  changeImage: PropTypes.func,
  obj: PropTypes.object,
  buttonClick: PropTypes.object,
  fistChunk: PropTypes.object,
  editStatus: PropTypes.bool,
  setFileListNum: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(FirstChunk)

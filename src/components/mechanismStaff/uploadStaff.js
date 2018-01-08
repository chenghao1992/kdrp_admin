import React, { PropTypes } from 'react'
import { Form, Modal, message, Row, Col } from 'antd'
import { parseString } from 'xml2js'
import OSSUpload from '../common/OSSUpload'
import { uploadSrc, getDomainName } from '../../utils/config'
import { OSS_CODE } from '../../utils/enums'

const modal = ({
  fileList,
  // isUploading,
  // personUrl,
  setFileList,
  uploadModalVisible,
  onOk,
  onCancel,
  form: {
    resetFields,
  },
}) => {
  function handleOk () {
    let successList = []
    let someFileUploaded = false
    // todo 在这里设置key值不太对，只能支持上传单个文件的，多个文件的，需要修改OSSUpload;
    fileList.forEach((value) => {
      successList.push(localStorage.getItem('file_prefix') + value.name)
      someFileUploaded = someFileUploaded || (value.status === 'done')
    })

    if (someFileUploaded) {
      onOk(successList)
    } else {
      message.error('尚未有成功上传的文件，请稍后再试')
    }
  }

  const modalOpts = {
    title: '导入职工',
    visible: uploadModalVisible,
    onOk: handleOk,
    onCancel () {
      resetFields()
      onCancel()
    },
    wrapClassName: 'vertical-center-modal',
  }

  const UploadProps = {
    fileList,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    multiple: false, // antd 一次上传多个文件时，不能设置多个token。。。导致文件只有第一个上传成功
    uploadSrc,
    uploadType: 'btn',
    typeList: 'Customer',
    tokenUrl: '/api/oss/upload_token/',
    handleChange (info) {
      let fileList = info.fileList

      // 只显示最近n个
      fileList = fileList.slice(-1)

      fileList.map((value) => {
        if (value.error) {
          let xml = value.response
          parseString(xml, { explicitArray: false }, (err, json) => {
            const CODE = json.Error.Code
            value.response = `上传失败：${OSS_CODE[CODE]}`
          })
        }
        return value
      })
      // 将所有文件
      // 列表存到mode的fileList
      setFileList(fileList)
    },
    handleBeforeUpload (file) {
      if (file.size / 1024 / 1024 > 5) {
        message.error('文件大小不能超过5M')
        return false
      }
      // 默认不能通过file.type获取.xls文件的格式
      const fileType = file.name.substring(file.name.lastIndexOf('.'))
      if (['.xls', '.xlsx'].indexOf(fileType) === -1) {
        message.error('仅支持上传excel文档', 5)
        return false
      }
      return true
    },
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col>
            <div style={{ marginBottom: 10 }}>
              <a href={`${getDomainName}/api/statics/staff/import.xlsx`} >下载导入模版</a>
            </div>
          </Col>
        </Row>
        {/* <Alert message="最多同时导入5个文件" type="info" showIcon/>*/}
        <OSSUpload {...UploadProps} />
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  fileList: PropTypes.array,
  isUploading: PropTypes.bool,
  personUrl: PropTypes.string,
  setFileList: PropTypes.func,
  uploadModalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,

}

export default Form.create()(modal)

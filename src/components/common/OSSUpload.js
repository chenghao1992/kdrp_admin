import React, { PropTypes } from 'react'
import Ajax from 'robe-ajax'
import { Form, Button, Row, Col, Icon, Upload, message } from 'antd'
import styles from './OSSUpload.less'
// import {uploadSrc} from '../../utils/config'

// todo 需要验证上传多个的时候的情况
function OSSUpload (props) {
  let {
    keys,
    deleteKeys,
    handleChange,
    handleBeforeUpload,
    personUrl,
    uploadType,
    uploadSrc,
    typeList,
    tokenUrl,
    isUploading,
    onMouseover, // 显示加号的进入事件
    onMouseMove, // 显示加号的离开事件
    addStatusOfImg, // 显示加号的state
    resetName,
  } = props

  let OwnProps = {
    name: 'file',
    action: uploadSrc,
    data: {
      OSSAccessKeyId: '',
      policy: '',
      Signature: '',
      key: '',
    },
    onChange (info) {
      handleChange(info)
    },
    beforeUpload (file, fileList) {
      let othis = this
      const nameReal = file.name.substring(0, file.name.lastIndexOf('.'))
      const nameRe = /^[\d|A-z|\u4E00-\u9FFF]+$/

      if (nameReal.length > 60) {
        message.error('文件名长度不能超过60个字符', 5)
        return false
      }

      if (!nameRe.test(nameReal)) {
        message.error('文件名只能由中文、英文、数字、下划线组成', 5)
        return false
      }

      return new Promise((resolve, reject) => {
        if (handleBeforeUpload(file, fileList) !== false) {
          Ajax.ajax({
            url: tokenUrl,
            data: {
              type: typeList,
            },
            type: 'GET',
            dataType: 'json',
            async: false,
          }).done((data) => {
            othis.data.OSSAccessKeyId = data.data.access_key_id
            othis.data.policy = data.data.policy
            othis.data.Signature = data.data.signature
            othis.data.key = data.data.file_prefix + file.name
            localStorage.clear('file_prefix')
            localStorage.setItem('file_prefix', data.data.file_prefix)
            resolve(file)
          }).fail(() => {
            message.error('请求失败')
          })
        } else {
          reject()
        }
      })
    },
    onRemove (file) {
      if (keys) {
        for (let i = 0; i < keys.length; i ++) {
          const listNumber = keys[i].substring(keys[i].indexOf('_') + 1)
          if (file.name === listNumber) {
            let d = keys
            d.splice(i, 1)
            deleteKeys(d)
          }
        }
      }
    },
  }

  return (
    <Row>
      <Col>
        {
          uploadType === 'image' ?
            <div onMouseOver={onMouseover} onMouseLeave={onMouseMove}>
              <Upload
                className={styles.avatar_uploader}
                // showUploadList={false}
                disabled={isUploading}
                {...props}
                {...OwnProps}
              >
                {
                  personUrl ?
                    <div className={styles.hover_lists} >
                      <div className={addStatusOfImg ? styles.hover_list : ''} style={{ display: 'none' }}>
                        <Icon type="plus" className={styles.avatar_uploader_trigger} />
                      </div>
                      <div>
                        <img src={personUrl} alt="" className={styles.avatar} />
                      </div>
                    </div>
                    :
                    <Icon type="plus" className={styles.avatar_uploader_trigger} />
                }
              </Upload>
            </div> :
            <div>
              {uploadType === 'btn' ?
              <Upload
                showUploadList
                {...props}
                {...OwnProps}
                disabled={keys ? isUploading : ''}
              >
                <Button >
                  <Icon type="upload" /> {resetName || '批量导入'}
                </Button>
              </Upload > :
              <Upload
                showUploadList
                {...props}
                {...OwnProps}
              >
                <Button>
                  <Icon type="upload" /> {resetName || '上传图片'}
                </Button>
              </Upload>}
            </div>

        }
      </Col>
    </Row>
  )
}

OSSUpload.propTypes = {
  handleChange: PropTypes.func,
  handleBeforeUpload: PropTypes.func,
  personUrl: PropTypes.string,
  uploadType: PropTypes.string,
  uploadSrc: PropTypes.string,
  typeList: PropTypes.string,
  tokenUrl: PropTypes.string,
  isUploading: PropTypes.bool,
  onMouseover: PropTypes.func,
  onMouseMove: PropTypes.func,
  addStatusOfImg: PropTypes.bool,
  keys: PropTypes.array,
  deleteKeys: PropTypes.func,
  resetName: PropTypes.string,
}

export default Form.create()(OSSUpload)

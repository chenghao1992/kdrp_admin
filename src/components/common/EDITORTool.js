/**
 * Created by xiaoys on 2017/9/5.
 */
import React, { Component, PropTypes } from 'react'
import Ajax from 'robe-ajax'
import E from 'wangeditor'
import { uploadSrc } from '../../utils/config'
import styles from './EDITORTool.less'


class EDITORTool extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      editorContent: '',
    }
  }

  componentDidMount () {
    console.log(this.props)

    const elem = this.refs.editorElem
    const editor = new E(elem)
    editor.customConfig.uploadImgServer = uploadSrc
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.menus = [
      ...this.props.menus,
    ]
    editor.customConfig.onchange = html => {
      this.props.handleChange(html)
    }

    editor.customConfig.uploadImgMaxLength = 1

    editor.customConfig.customUploadImg = (files, insert) => {
      this.props.spanStatus(true)
      return new Promise(() => {
        Ajax.ajax({
          url: '/api/oss/upload_token/',
          data: {
            type: 'Cms',
          },
          type: 'GET',
          dataType: 'json',
          async: false,
        }).done((data) => {
          let formData = new FormData()
          formData.append('OSSAccessKeyId', data.data.access_key_id)
          formData.append('policy', data.data.policy)
          formData.append('Signature', data.data.signature)
          formData.append('key', data.data.file_prefix + files[0].name)
          formData.append('file', files[0])
          sessionStorage.setItem('key', data.data.file_prefix + files[0].name)
          Ajax.ajax({
            url: uploadSrc,
            data: formData,
            type: 'post',
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          }).done(() => {
            const imgUrl = `${uploadSrc}/${sessionStorage.getItem('key')}`
            insert(imgUrl)
            this.props.spanStatus(false)
            console.log(imgUrl)
          })
          // resolve(files)
        }).fail(() => {
          // message.error('请求失败')
        })
      })
    }
    editor.create()
    editor.txt.html(this.props.saveProblem.content)
  }

  clickHandle () {
    // alert(this.state.editorContent)
  }


  render () {
    return (
      <div className="App">
        {/* 将生成编辑器 */}
        <div className={styles.editorStyle} ref="editorElem" style={{ textAlign: 'left' }}>
        </div>
        {/* <button onClick={this.clickHandle.bind(this)}>获取内容</button>*/}
      </div>
    )
  }
}

EDITORTool.propTypes = {
  menus: PropTypes.array,
  handleChange: PropTypes.func,
  saveProblem: PropTypes.object,
  spanStatus: PropTypes.func,
}


export default EDITORTool


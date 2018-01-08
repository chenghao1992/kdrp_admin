
import React, { PropTypes } from 'react'
import { Button } from 'antd'

import EDITORTool from '../common/EDITORTool'

function CommonProblemsShowAdd ({ onCannel, onChange, handleOk, saveProblem = {} }) {
  const CommonProblemsShowAddProps = {
    menus: [
      'head',  // 标题
      'bold',  // 粗体
      'underline',  // 下划线
      'link',  // 插入链接
      'justify',  // 对齐方式
      'undo',  // 撤销
      'redo',  // 重复
    ],
    handleChange (params) {
      onChange(params)
    },
    saveProblem,
  }


  return (
    <div>
      <EDITORTool {...CommonProblemsShowAddProps} />
      <div style={{ float: 'right', marginTop: 15 }}>
        <Button style={{ marginRight: 20 }} onClick={() => { onCannel() }}>取消</Button>
        <Button type="primary" htmlType="submit" onClick={() => { handleOk() }}>保存并提交</Button>
      </div>
    </div>
  )
}

CommonProblemsShowAdd.propTypes = {
  onCannel: PropTypes.func,
  onChange: PropTypes.func,
  handleOk: PropTypes.func,
  saveProblem: PropTypes.object,
}

export default CommonProblemsShowAdd

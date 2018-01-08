/**
 * Created by xiaoys on 2017/9/5.
 */
import React, { PropTypes } from 'react'
import EDITORTool from '../common/EDITORTool'


function AddEdit ({ onChange, saveProblem, spanStatus }) {
  const CommonProblemsShowAddProps = {
    menus: [
      'head',  // 标题
      'bold',  // 粗体
      'underline',  // 下划线
      'link',  // 插入链接
      'image',  // 插入图片
      'justify',  // 对齐方式
      'undo',  // 撤销
      'redo',  // 重复
    ],
    handleChange (params) {
      onChange(params)
    },
    saveProblem,
    spanStatus,
  }
  return (
      <div>
        <EDITORTool {...CommonProblemsShowAddProps} />
      </div>
    )
}

AddEdit.propTypes = {
  onChange: PropTypes.func,
  spanStatus: PropTypes.func,
  saveProblem: PropTypes.object,
}

export default AddEdit


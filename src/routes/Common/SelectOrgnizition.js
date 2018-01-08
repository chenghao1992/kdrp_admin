/*
import React from 'react'
import { connect } from 'dva'
import { Cascader } from 'antd'
import styles from './SelectOrgnizition.css'

// todo antd自带验证无法更新到组件的数据变化，所以还是不能抽出来？？！需要写在单独的页面里。。。
// 业务组件：选择组织：location的query值中必须要有id，并且queryOrgnizition＝1；
function SelectOrgnizition ({ location, dispatch, style, selectOrgnizition }) {
  const { options } = selectOrgnizition

  const onChange = (value, selectedOptions) => {
    /!* console.log(value)
    console.log(selectedOptions)*!/
  }

  const displayRender = (label, selectedOptions) => {
    return label[label.length - 1]
  }

  // 格式转换 key=>value;title=>label
  const opts = JSON.parse(JSON.stringify(options).replace(/key/g, 'value').replace(/title/g, 'label'))


  return (
      <Cascader
        displayRender={displayRender}
        placeholder="请选择组织"
        options={opts} onChange={onChange} changeOnSelect style={style}
      />

  )
}

function mapStateToProps ({ selectOrgnizition }) {
  return { selectOrgnizition }
}

export default connect(mapStateToProps)(SelectOrgnizition)
*/

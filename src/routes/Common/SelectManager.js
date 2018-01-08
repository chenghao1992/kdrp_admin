/*
import React from 'react'
import { connect } from 'dva'
import { Select } from 'antd'
import styles from './SelectManager.css'

const Option = Select.Option

// todo antd自带验证无法更新到组件的数据变化，所以还是不能抽出来？？！需要写在单独的页面里。。。
// 业务组件：选择管理员
function SelectManager ({ location, dispatch, selectManager }) {
  const { value, data } = selectManager

  const handleChange = (value) => {
    dispatch({
      type: 'selectManager/query',
      payload: {
        value,
      },
    })
  }


  return (
      <Select
        showSearch
        placeholder="输入姓名或手机号进行搜索"
        style={{ width: 200 }}
        optionFilterProp="children"
        onSearch={handleChange}
      >
        {
          data.map(d => <Option key={d.id} >{d.mobile}-{d.name}</Option>)
        }
      </Select>
  )
}

function mapStateToProps ({ selectManager }) {
  return { selectManager }
}

export default connect(mapStateToProps)(SelectManager)
*/

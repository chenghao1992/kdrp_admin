/**
 * Created by xiaoys on 2017/11/28.
 */
import React from 'react'

function Remarks () {
  return (
    <div style={{ backgroundColor: '#ffc', padding: 10 }}>
      <p>备注：</p>
      <p>
        昨日时点值：取截止昨日凌晨的所有历史数据进行统计输出时点值，不会随着您选择时间段变化。<br />
        区间值：当您选择了一个时间段后，点击搜索，区间值下面的字段值会显示这个时间段内的统计金额。<br />
        客户数：昨天晚上24点客户的数量<br />
        有效客户数：累计投资额不为0的客户数<br />
        活跃客户数：待收本金不为0的客户数<br />
      </p>
    </div>
  )
}

export default Remarks

import React, { PropTypes } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'
import { Row, Col, Icon } from 'antd'
// import { formatMoney } from '../../utils/index'
// import styles from '../../components/common_list.less'

const Chart = createG2(chart => {
  const Stat = G2.Stat
  // 重要：绘制饼图时，必须声明 theta 坐标系
  chart.coord('theta', {
    radius: 0.8, // 设置饼图的大小
  })
  chart.legend(false)
  chart.tooltip({
    custom: true,
    html: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;background-color:rgba(0, 0, 0, 0.7);padding:0 10px"><table class="ac-list custom-table"></table></div>',
    itemTpl: '<tr><td style="color:{color};">&bull;&nbsp;</td><td style="color:#fff">{name}：</td><td style="color:#fff">¥{value}</td></tr>',
    title: null,
    map: {
      value: 'value',
    },
  })
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*..percent', (name, percent) => {
      percent = `${(percent * 100).toFixed(2)}%`
      return `${name} ${percent}`
    })
  chart.render()
  // 设置默认选中
  let geom = chart.getGeoms()[0] // 获取所有的图形
  let items = geom.getData() // 获取图形对应的数据
  geom.setSelected(items[1]) // 设置选中
})

class PieChart extends React.Component {
  state = {
    forceFit: true,
    width: 200,
    height: 300,
  }

  render () {
    const data = this.props.datas
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        Number(data[i].value.toFixed(2))
      }
      return (
        <div>
          <Chart
            data={data}
            width={this.state.width}
            height={this.state.height}
            forceFit={this.state.forceFit}
          />
        </div>
      )
    }
    return (
      <Row type="flex" justify="center">
        <Col>
          <Icon type="frown-o" />
          <span style={{ marginLeft: 5, color: 'rgba(0,0,0,.43)' }}>暂无数据</span>
        </Col>
      </Row>
    )
  }
}


PieChart.propTypes = {
  datas: PropTypes.array,
}

export default PieChart

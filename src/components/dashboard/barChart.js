import React, { PropTypes } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'

const Chart = createG2(chart => {
  // const Stat = G2.Stat
  chart.legend({
    position: 'top',
  })
  chart.tooltip({
    custom: true,
    html: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;background-color:rgba(0, 0, 0, 0.7);padding:0 10px"><table class="ac-list custom-table"></table></div>',
    itemTpl: '<tr><td style="color:{color};">&bull;&nbsp;</td><td style="color:#fff">{name}：</td><td style="color:#fff">¥{value}</td></tr>',
    title: null,
    map: {
      value: 'value',
    },
  })
  chart.col('name', { alias: '类别' })
  chart.intervalDodge().position('时间段*').color('name')
  chart.render()
})

class BarChart extends React.Component {
  state ={
    forceFit: true,
    width: 500,
    height: 340,
    plotCfg: {
      margin: [50, 50, 80, 80],
    },
  }

  render () {
    const data = this.props.datas
    const xx = this.props.days
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        let datas = item.data
        for (let j = 0; j < datas.length; j++) {
          item[xx[j]] = Number(datas[j].toFixed(2))
        }
        data[i] = item
      }
      let Frame = G2.Frame
      let frame = new Frame(data)
      frame = Frame.combinColumns(frame, xx, '', '时间段', 'name')
      return (
          <div>
            <Chart
              title="null"
              data={frame}
              width={this.state.width}
              height={this.state.height}
              plotCfg={this.state.plotCfg}
              forceFit={this.state.forceFit}
            />
          </div>
        )
    }
    return (<div></div>)
  }
}

BarChart.propTypes = {
  datas: PropTypes.array,
  days: PropTypes.array,
}

export default BarChart

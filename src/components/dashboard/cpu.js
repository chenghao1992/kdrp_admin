import createG2 from 'g2-react'
import styles from './cpu.less'
import React, { PropTypes } from 'react'
// import ReactDOM from 'react-dom'
// import { Stat } from 'g2'
// import { color } from '../../utils'
// import CountUp from 'react-countup'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import data from './diamond.json'


const Chart = createG2(chart => {
  chart.col('month', {
    alias: '月份',
    range: [0, 1],
  })
  chart.col('temperature', {
    alias: '平均温度(°C)',
  })
  chart.line().position('month*temperature').size(2)
  chart.render()
})

// const countUpProps = {
//   start: 0,
//   duration: 2.75,
//   useEasing: true,
//   useGrouping: true,
//   separator: ',',
// }


class Cpu extends React.Component {

  static get defaultProps () {
    return {
      mockdata: [
        { month: 'Jan', temperature: 0 },
        { month: 'Feb', temperature: 0 },
        { month: 'Mar', temperature: 0 },
        { month: 'Apr', temperature: 0 },
        { month: 'May', temperature: 18.2 },
        { month: 'Jun', temperature: 0 },
        { month: 'Jul', temperature: 25.2 },
        { month: 'Aug', temperature: 26.5 },
        { month: 'Sep', temperature: 23.3 },
        { month: 'Oct', temperature: 18.3 },
        { month: 'Nov', temperature: 13.9 },
        { month: 'Dec', temperature: 9.6 },
      ],
    }
  }

  state ={
    width: 500,
    height: 250,
    plotCfg: {
      margin: [10, 100, 50, 120],
    },
  }


  render () {
    const data = this.props.mockdata
    return (<div className={styles.cpu}>
      <Chart
        data={data}
        width={this.state.width}
        height={this.state.height}
        plotCfg={this.state.plotCfg}
      />
    </div>
    )
  }


}


Cpu.propTypes = {
  mockdata: PropTypes.array,
  data: PropTypes.array,
  usage: PropTypes.number,
  space: PropTypes.number,
  cpu: PropTypes.number,
}

export default Cpu

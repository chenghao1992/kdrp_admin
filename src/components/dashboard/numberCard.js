import React, { PropTypes } from 'react'
import { Icon, Card } from 'antd'
import styles from './numberCard.less'
import { formatMoney } from '../../utils/index'
// import CountUp from 'react-countup'

function NumberCard ({ icon, color, title, number, type }) {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      {icon !== '' ? <Icon className={styles.iconWarp} style={{ color }} type={icon} /> : ''}
      <div className={styles.content}>
      <p className={styles.title}>{title || 'No Title'}</p>
        {
          title === '昨日新增服务费' || title === '本月累计服务费' ?
            <p className={styles.number}>--</p> :
            <p className={styles.number}>
              {type !== 'money' ? number : `¥${formatMoney(number)}`}
            </p>
        }
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  type: PropTypes.string,
}

export default NumberCard

import React, { PropTypes } from 'react'
import styles from './RuleList.css'
import { Rule } from './Rule'

function RuleList ({ data }) {
  const list = data.map(() => {
    return <Rule />
  })
  return (
    <div className={styles.normal}>
      {list}
    </div>
  )
}

RuleList.propTypes = {
  data: PropTypes.array,
}

export default RuleList

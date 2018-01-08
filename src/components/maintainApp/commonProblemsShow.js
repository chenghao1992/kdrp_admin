import React, { PropTypes } from 'react'
// import { Button } from 'antd'

// import styles from '../common_list.less'
// import classNames from 'classnames'


class CommonProblemsShow extends React.Component {

  componentDidMount () {
    document.getElementById('content').innerHTML = this.props.saveProblem.content
  }

  render () {
    return (
      <div>
        <div style={{ height: 20, width: '100%', borderTopColor: '#ebebeb', borderTopWidth: 1, borderTopStyle: 'solid' }}></div>
        <div id="content"></div>
      </div>
    )
  }
}

CommonProblemsShow.propTypes = {
  saveProblem: PropTypes.object,
}

export default CommonProblemsShow


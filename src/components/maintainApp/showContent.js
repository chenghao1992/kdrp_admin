import React, { PropTypes } from 'react'
import styles from './showContent.less'

class ShowContent extends React.Component {

  componentDidMount () {
    console.log(this.props.getDetailList)
    document.getElementById('content').innerHTML = this.props.getDetailList.content
  }

  render () {
    return (
      <div>
        <div style={{ height: 20, width: '100%', borderTopColor: '#ebebeb', borderTopWidth: 1, borderTopStyle: 'solid' }}></div>
        <h2>{this.props.getDetailList.title}</h2>
        {this.props.getDetailList.sub_title ? <h3>{this.props.getDetailList.sub_title}</h3> : ''}
        <p>发稿时间：<span>{this.props.getDetailList.release_time}</span></p>
        <p>操作人：<span>{this.props.codes.username}</span></p>
        <br />
        <div id="content" className={styles.content}></div>
      </div>
    )
  }
}

ShowContent.propTypes = {
  getDetailList: PropTypes.object,
  codes: PropTypes.object,
}

export default ShowContent

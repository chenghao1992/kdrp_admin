/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { Button } from 'antd'

function Btns ({
  type,
  text,
  handleClicks,
}) {
  return (
    <Button key={text} type={type || ''} onClick={handleClicks}>{text}</Button>
  )
}

Btns.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  handleClicks: PropTypes.func,
}

export default Btns

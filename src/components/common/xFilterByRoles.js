/**
 * Created by pengshuo on 17/6/27.
 */
import { PropTypes } from 'react'


function xFilterByRoles ({ activeRole, allowedRoles, children }) {
  let flag = false

  flag = allowedRoles.indexOf(activeRole) > -1

  return (flag ? children : null)
}

xFilterByRoles.propTypes = {
  children: PropTypes.element,
  allowedRoles: PropTypes.array,
  activeRole: PropTypes.string,
}

export default xFilterByRoles

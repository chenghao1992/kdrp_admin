import React, { PropTypes } from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './menu'
import { Link } from 'dva/router'


function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, menu }) {
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo}>
        <Link to="/dashboard">
          <img src={config.logoSrc} alt="kaisa logo" />
          {siderFold ? '' : <span style={{ color: '#fff' }}>{config.logoText}</span>}
        </Link>
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
      </div> : ''}
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider

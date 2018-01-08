import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
// import { menu } from '../../utils'


function Menus ({ siderFold, darkTheme, location, handleClickNavMenu, navOpenKeys, changeOpenKeys, menu }) {
  const topMenus = menu.map(item => item.key)
  const getMenus = function (menuArray, siderFold2, parentPath) {
    parentPath = parentPath || '/'
    return menuArray.map(item => {
      if (item.child) {
        return (
          <Menu.SubMenu key={item.key} title={<span>{item.icon ?
            <Icon type={item.icon} /> : ''}{siderFold2 && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
            {getMenus(item.child, siderFold2, `${parentPath}${item.key}/`)}
          </Menu.SubMenu>
        )
      }

      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold2 && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    })
  }


  const menuItems = getMenus(menu, siderFold)

  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation'],
    }
    return map[key] || []
  }

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  // 菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}
    >
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Menus

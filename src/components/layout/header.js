import React, { PropTypes } from 'react'
import { Menu, Icon, Popover, Badge, Alert } from 'antd'
import styles from './main.less'
import stylesCommon from '../../components/common_list.less'
import Menus from './menu'
import { Link } from 'dva/router'
import { STATUS_TAG_COLOR_PLUS, TASK_TYPE } from '../../utils/enums'

const SubMenu = Menu.SubMenu

function Header ({
  user, logout, switchRole, switchSider, siderFold, isNavbar, menuPopoverVisible, location,
  switchMenuPopover, navOpenKeys, changeOpenKeys, roles, menu, currentTasks, count,

}) {
  let handleClickMenu = e => {
    if (e.key === 'logout') {
      logout()
    } else {
      if (e.key.indexOf(',') > -1) {
        let args = e.key.split(',')
        switchRole({
          key: args[0],
          agency_id: args[1],
        })
      }
    }
  }
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  return (
    <div className={styles.header}>
      <Alert message={<span style={{ color: '#fe2236' }}>目前系统试处于运行期间，所有数据仅供查阅，不作为结算依据。正式上线时间以金服工作人员正式通知为准。</span>} type="warning" showIcon />
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
          overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}
        >
        <div className={styles.siderbutton}>
          <Icon type="bars" />
        </div>
      </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
        <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
      </div>}


      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>


        <SubMenu style={{
          float: 'right',
        }} title={<div>{user.avatar ? <img src={user.avatar} alt="" style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          position: 'absolute',
          left: -5,
          top: 13,
        }} /> : ''}<span>{user.real_name} </span></div>}
        >
          {
            roles.map(d => {
              return (<Menu.Item key={`${d.key},${d.agency_id}`}>
                <span className={styles.userPhoto}><Icon type="user" /></span>
                <span style={{ marginLeft: 0 }}>{d.name}</span>
                <span style={{ marginLeft: 5 }}>{d.agency_name}</span>
                {d.is_active && <Icon type="check-circle" className={stylesCommon.common_f_success} />}
              </Menu.Item>)
            })
          }
          <Menu.Item key="logout">
            <a><Icon type="logout" />注销</a>
          </Menu.Item>
        </SubMenu>


        <SubMenu
          className={styles.taskmenu}
          style={{
            float: 'right',
          }} title={<Link to="/task/taskList"><span><Icon type="calendar" />任务 {currentTasks.length ? <Badge count={count} /> : null}</span></Link>}
        >
          {
            currentTasks.map(d => {
              return (<Menu.Item key={d.id} type="task" className={d.status === 'fail' ? stylesCommon.common_f_error : ''}>
                <div><span style={{ color: STATUS_TAG_COLOR_PLUS[d.status] }}>[{TASK_TYPE[d.type]}]</span><Link
                  to={{
                    pathname: '/task/taskDetail',
                    query: { id: d.id },
                  }}
                >{d.name}{d.type !== 'export' ? `(${d.progress}%)` : ''}</Link>
                  {d.file_url ? <a target="_blank" href={`${d.file_url}`}>下载</a> : ''}</div>
              </Menu.Item>)
            })
          }
          {currentTasks.length ? (<Menu.Item><Link to="/task/taskList">查看更多</Link></Menu.Item>) : <Menu.Item >暂无执行中任务</Menu.Item>}

        </SubMenu>


      </Menu>
    </div>
  )
}

Header.propTypes = {
  count: PropTypes.number,
  currentTasks: PropTypes.array,
  menu: PropTypes.array,
  roles: PropTypes.array,
  switchRole: PropTypes.func,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header

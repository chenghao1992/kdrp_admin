import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import TopMsg from '../components/layout/TopMsg'

import styles from '../components/layout/main.less'

import { classnames } from '../utils'
import '../components/layout/common.less'

function App ({ children, location, dispatch, app }) {
  const {
    user, siderFold, darkTheme, isNavbar,
    menuPopoverVisible, navOpenKeys, roles, freezeMsg, menu, currentTasks, count,
  } = app

  const headerProps = {
    count,
    currentTasks,
    menu,
    roles,
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchRole (data) {
      dispatch({
        type: 'app/switchRole',
        payload: data,
      })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const topMsgProps = {
    freezeMsg,
  }

  return (
    <div
      className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}
    >
      {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
        <Sider {...siderProps} />
      </aside> : ''}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread location={location} />
        <div className={styles.container}>
          <div className={styles.content}>
            <TopMsg {...topMsgProps} />
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)

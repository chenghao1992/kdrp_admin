import React from 'react'
import { connect } from 'dva'
import styles from './lperson.css'

function OrgPermissionsLperson () {
  return (
    <div className={styles.normal}>
      Route Component: OrgPermissions/lperson
    </div>
  )
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(OrgPermissionsLperson)

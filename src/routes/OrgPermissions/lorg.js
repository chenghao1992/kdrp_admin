import React, { PropTypes } from 'react'
import { connect } from 'dva'
import OrgPermissionsList from '../../components/orgPermissions/List'
import OrgPermissionsSearch from '../../components/orgPermissions/Search'
import styles from '../../components/common_list.less'

function OrgPermissionsLorg ({ dispatch, orgPermissionsLo, loading }) {
  const { orgTree, list, pagination, query, expand, resetOrg } = orgPermissionsLo

  const orgPermissionsSearchProps = {
    queryByPreQuery () {
      dispatch({
        type: 'orgPermissionsLo/queryByPreQuery',
      })
    },
    resetOrg,
    resetOrgTree () {
      dispatch({
        type: 'orgPermissionsLo/resetOrgTree',
      })
    },
    orgValue: query.idList,
    orgTree,
    onSearch (data) {
      dispatch({
        type: 'orgPermissionsLo/search',
        payload: {
          status: data.status,
          idList: data.id,
          start_end_time: data.start_end_time,
          name: data.name,
          'manager.username': data.manager.username,
          'manager.real_name': data.manager.real_name,
          page: 1,
          page_size: pagination.pageSize,
        },

      })
    },
    expand,
    onToggle (expand) {
      dispatch({
        type: 'orgPermissionsLo/onToggle',
        payload: !expand,
      })
    },
    handleOrgChange (value) {
      dispatch({
        type: 'orgPermissionsLo/setOrg',
        payload: value,
      })
    },
  }

  const orgPermissionsListProps = {
    loading,
    dataSource: list,
    pagination,
    onTableChange (pagination) {
      dispatch({
        type: 'orgPermissionsLo/query',
        payload: {
          page: pagination.current,
          page_size: pagination.pageSize,
        },
      })
    },
    handleAClick (id) {
      return function () {
        dispatch({
          type: 'orgPermissionsLo/resetOrg',
        })
        /* setTimeout(function(){

         },0)*/
        dispatch({
          type: 'orgPermissionsLo/changeOrg',
          payload: id,
        })
      }
    },

  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>组织权限</h1>
      <OrgPermissionsSearch {...orgPermissionsSearchProps} />
      <OrgPermissionsList {...orgPermissionsListProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    orgPermissionsLo: state.orgPermissionsLo,
    loading: state.loading.models.orgPermissionsLo,
  }
}

OrgPermissionsLorg.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  orgPermissionsLo: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(OrgPermissionsLorg)


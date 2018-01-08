import React, { PropTypes } from 'react'
import { connect } from 'dva'

import PartnerList from '../../components/partner/List'
import PartnerSearch from '../../components/partner/Search'
import PartnerButton from '../../components/partner/AddButton'
import styles from '../../components/common_list.less'
import BMModal from '../../components/partner/BMModal'
import { routerRedux } from 'dva/router'


function Partner ({ location, dispatch, partner, app, loading }) {
  const { list, pagination, expand, leaders, currentLeaderId, bmModalVisible } = partner
  const { activeRole } = app

  const partnerSearchProps = {
    onSearch (data) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          status: data.status,
          create_time: data.create_time,
          name: data.name,
          'contact.name': data.contact.name,
          'contact.mobile': data.contact.mobile,
          page: 1,
          page_size: pagination.pageSize,
        },
      }))
    },
    expand,
    onToggle (expand) {
      dispatch({
        type: 'partner/onToggle',
        payload: !expand,
      })
    },
  }

  const partnerListProps = {
    activeRole,
    loading,
    dataSource: list,
    pagination,
    onTableChange (pagination) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: pagination.current,
          page_size: pagination.pageSize,
        },
      }))
    },
    onBmClick ({ currentLeaderId, currentChannelId }) {
      return function () {
        dispatch({
          type: 'partner/queryDistributeBm',
          payload: {
            currentLeaderId,
            currentChannelId,
          },
        })
      }
    },
  }


  const bMModalProps = {
    visible: bmModalVisible,
    leaders,
    currentLeaderId,
    onOk (data, resetFields) {
      dispatch({
        type: 'partner/distributeBm',
        payload: {
          data,
          resetFields,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'partner/bMModelHide',
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>机构</h1>
      <PartnerSearch {...partnerSearchProps} />
      <PartnerButton />
      <PartnerList {...partnerListProps} />

      <BMModal {...bMModalProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    app: state.app,
    partner: state.partner,
    loading: state.loading.models.partner,
  }
}

Partner.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  partner: PropTypes.object,
  app: PropTypes.object,
  loading: PropTypes.bool,
}


export default connect(mapStateToProps)(Partner)

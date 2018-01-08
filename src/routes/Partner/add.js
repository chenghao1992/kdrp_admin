import React, { PropTypes } from 'react'
import { connect } from 'dva'
import PartnerAddForm from '../../components/partner/Add'
import styles from '../../components/common_list.less'
import classNames from 'classnames'

function PartnerAdd ({ dispatch, loading }) {
  const partnerAddFormProps = {
    loading,
    onOk (data) {
      dispatch({
        type: 'partnerAdd/create',
        payload: {

          name: data.name,
          full_name: data.full_name,
          level: data.level,
          code: data.code,
          'business_contact.name': data.business_contact.name,
          'business_contact.mobile': data.business_contact.mobile,
          'business_contact.email': data.business_contact.email,
          note: data.note,
          'user.real_name': data.user.real_name,
          'user.mobile': data.user.mobile,
          'user.email': data.user.email,

        },
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={classNames(styles.common_header_h1, styles.common_margin_b15)}>新建机构</h1>
      <PartnerAddForm {...partnerAddFormProps} />

    </div>
  )
}

function mapStateToProps (state) {
  return {
    partnerAdd: state.partnerAdd,
    loading: state.loading.models.partnerAdd,
  }
}

PartnerAdd.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  partnerAdd: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(PartnerAdd)

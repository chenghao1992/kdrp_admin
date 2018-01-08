/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import commonStyles from '../../components/common_list.less'

import NewContacts from '../../components/customer/newContacts'

function CustomerListCsNew ({ dispatch, location, customerListCsNew }) {
  const enums = ['新建联系人', '编辑联系人', '查看联系人']

  const { contactTyped, codes } = customerListCsNew

  const newContactsProps = {
    location,
    codes,
    contactTyped,
    onHandle (params, reset) {
      const data = { ...params, customer_id: location.query.id }
      dispatch({
        type: `customerListCsNew/${location.query.status === '1' ? 'newContact' : 'editContact'}`,
        payload: { data, reset },
      })
    },
    initCodes () {
      dispatch({
        type: 'customerListCsNew/saveCode',
        payload: {},
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={commonStyles.common_header_h1}>{enums[location.query.status - 1]}</h1>
      <NewContacts {...newContactsProps} />
    </div>
  )
}

CustomerListCsNew.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  customerListCsNew: PropTypes.object,
}

export default connect(({ customerListCsNew }) => ({ customerListCsNew }))(CustomerListCsNew)

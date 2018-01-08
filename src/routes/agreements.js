import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Agreement from '../components/agreements/agreements'

function Agreements ({ dispatch, agreements }) {
  const { id, statusType } = agreements

  const agreeProps = {
    statusType,
    id,
    agreeTexts () {
      dispatch({
        type: 'agreements/agreeText',
        payload: {
          id,
        },
      })
    },
  }

  return (
    <div className="content-inner" style={{ height: 800 }}>
      <Agreement {...agreeProps} />
    </div>
  )
}


Agreements.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  agreements: PropTypes.object,
}

export default connect(({ agreements }) => ({ agreements }))(Agreements)

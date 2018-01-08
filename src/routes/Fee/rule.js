import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Button, Row } from 'antd'
import styles from '../../components/common_list.less'
import Rule from '../../components/fee/Rule'
import classNames from 'classnames'


function FeeRule ({ dispatch, feeRule }) {
  const { addRule, feeRules, channel } = feeRule

  const handleAdd = function () {
    dispatch({
      type: 'feeRule/addRule',
    })
  }

  const addRuleProps = {
    data: {
      status: 'edit',
      ...addRule.data,
      rules: channel.rules,
    },
    handleCancel () {
      dispatch({
        type: 'feeRule/addCancel',
      })
    },
    handleEdit () {

    },
    handleSave (values) {
      values.rules = JSON.stringify(values.rules)

      dispatch({
        type: 'feeRule/addRuleSync',
        payload: values,
      })
    },
  }

  const ruleProps = {
    handleCancel (ruleId) {
      dispatch({
        type: 'feeRule/editOrView',
        payload: {
          ruleId,
          type: 'view',
        },
      })
    },
    handleEdit (ruleId) {
      dispatch({
        type: 'feeRule/editOrView',
        payload: {
          ruleId,
          type: 'edit',
        },
      })
    },
    handleSave (values, ruleId) {
      values.rules = JSON.stringify(values.rules)

      dispatch({
        type: 'feeRule/editRuleSync',
        payload: {
          ...values,
          ruleId,
        },
      })
    },
    handleDelete (ruleId) {
      dispatch({
        type: 'feeRule/deleteRuleSync',
        payload: {
          ruleId,
        },
      })
    },
  }

  const ruleList = feeRules.map(d => {
    return <Rule data={d} key={d.id} {...ruleProps} />
  })

  return (
    <div className="content-inner">
      <Row className={classNames(styles.common_margin_b10, styles.common_clear_float)}>
        <h1 className={classNames(styles.common_header_h1, styles.common_fl)}>{channel.name}－服务费分配计划设定</h1>
        {/* <Button className={classNames(styles.common_fr)} icon="plus" onClick={handleAdd}>添加</Button>*/}
      </Row>
      <Button size="large" type="dashed" style={{ width: '100%' }} className={styles.common_margin_b10} icon="plus" onClick={handleAdd}>添加</Button>

      {addRule.show ? <Rule {...addRuleProps} /> : null}
      {ruleList}
    </div>
  )
}

function mapStateToProps ({ feeRule }) {
  return { feeRule }
}

FeeRule.propTypes = {
  dispatch: PropTypes.func,
  feeRule: PropTypes.object,
}

export default connect(mapStateToProps)(FeeRule)

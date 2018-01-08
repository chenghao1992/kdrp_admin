import React, { PropTypes } from 'react'
import { Button, Dropdown, Menu, Icon } from 'antd'
import styles from '../common_list.less'

function Extra ({ status, handleCancel, handleSave, handleMenuClick, buttons }) {
  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        buttons.map(value => {
          return <Menu.Item key={value}>{value}</Menu.Item>
        })
      }
    </Menu>
  )

  return (
    <div className={styles.normal}>
      {status === 'edit' ? (
        <div>
          <Button className={styles.common_margin_r10} onClick={handleCancel}>取消</Button>
          <Button onClick={handleSave} type="primary">保存</Button>
        </div>
      ) : (
        <Dropdown overlay={menu}>
          <Button>
            编辑<Icon type="down" />
          </Button>
        </Dropdown>
      )}
    </div>
  )
}

Extra.propTypes = {
  status: PropTypes.string,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  handleMenuClick: PropTypes.func,
  buttons: PropTypes.array,
}

export default Extra
